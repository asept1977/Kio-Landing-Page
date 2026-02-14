import { useEffect, useRef, useCallback, useState } from "react";
import * as THREE from "three";

interface NodeDef {
  label: string;
  x: number;
  y: number;
  color: string;
  side: "left" | "right";
}

const LEFT_COLOR = "#4da3ff";
const RIGHT_COLOR = "#9b7bff";
const CORE_COLOR = "#ff6a1a";
const BG_COLOR = "#0b1d2c";

const LEFT_NODES: Omit<NodeDef, "x" | "y" | "side">[] = [
  { label: "ERP", color: LEFT_COLOR },
  { label: "CRM", color: LEFT_COLOR },
  { label: "Miro", color: LEFT_COLOR },
  { label: "Outlook", color: LEFT_COLOR },
  { label: "SharePoint", color: LEFT_COLOR },
  { label: "Teams", color: LEFT_COLOR },
  { label: "Atlassian", color: LEFT_COLOR },
  { label: "Database", color: LEFT_COLOR },
];

const RIGHT_NODES: Omit<NodeDef, "x" | "y" | "side">[] = [
  { label: "North Data", color: RIGHT_COLOR },
  { label: "Statista", color: RIGHT_COLOR },
  { label: "DIP", color: RIGHT_COLOR },
  { label: "Lobbyregister", color: RIGHT_COLOR },
  { label: "Dun & Bradstreet", color: RIGHT_COLOR },
];

function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

function createTextTexture(text: string, color: string, w: number, h: number): THREE.Texture {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "rgba(0,0,0,0)";
  ctx.fillRect(0, 0, w, h);

  const borderColor = color;
  const bgColor = `${color}18`;

  const r = 6;
  ctx.beginPath();
  ctx.moveTo(r, 0);
  ctx.lineTo(w - r, 0);
  ctx.quadraticCurveTo(w, 0, w, r);
  ctx.lineTo(w, h - r);
  ctx.quadraticCurveTo(w, h, w - r, h);
  ctx.lineTo(r, h);
  ctx.quadraticCurveTo(0, h, 0, h - r);
  ctx.lineTo(0, r);
  ctx.quadraticCurveTo(0, 0, r, 0);
  ctx.closePath();

  ctx.fillStyle = bgColor;
  ctx.fill();
  ctx.strokeStyle = borderColor;
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.font = "bold 28px Inter, system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = color;
  ctx.fillText(text, w / 2, h / 2);

  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

function createCoreTexture(w: number, h: number): THREE.Texture {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;

  ctx.clearRect(0, 0, w, h);

  const cx = w / 2;
  const cy = h / 2;
  const radius = Math.min(w, h) / 2 - 8;

  const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
  grd.addColorStop(0, `${CORE_COLOR}60`);
  grd.addColorStop(0.6, `${CORE_COLOR}25`);
  grd.addColorStop(1, `${CORE_COLOR}08`);

  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.fillStyle = grd;
  ctx.fill();

  ctx.strokeStyle = `${CORE_COLOR}90`;
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.font = "bold 64px Inter, system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#ffffff";
  ctx.fillText("KIO", cx, cy);

  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

interface PulseData {
  t: number;
  speed: number;
  curve: THREE.QuadraticBezierCurve3;
  mesh: THREE.Mesh;
}

function Canvas2DFallback() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    interface FallbackNode {
      label: string;
      color: string;
      x: number;
      y: number;
    }

    interface FallbackPulse {
      t: number;
      speed: number;
      nodeIdx: number;
    }

    let nodes: FallbackNode[] = [];
    let pulses: FallbackPulse[] = [];
    let coreX = 0;
    let coreY = 0;

    const setupLayout = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const isMobile = w < 768;

      coreX = w / 2;
      coreY = h * 0.6;

      const leftList = isMobile ? LEFT_NODES.slice(0, 5) : LEFT_NODES;
      const rightList = isMobile ? RIGHT_NODES.slice(0, 3) : RIGHT_NODES;

      const leftX = w * 0.08;
      const rightX = w * 0.92;
      const startY = h * 0.12;
      const spacingL = (h * 0.76) / Math.max(leftList.length - 1, 1);
      const spacingR = (h * 0.76) / Math.max(rightList.length - 1, 1);

      nodes = [];
      leftList.forEach((n, i) => {
        nodes.push({ label: n.label, color: n.color, x: leftX, y: startY + i * spacingL });
      });
      rightList.forEach((n, i) => {
        nodes.push({ label: n.label, color: n.color, x: rightX, y: startY + i * spacingR });
      });

      pulses = [];
      if (!prefersReduced) {
        nodes.forEach((_, idx) => {
          pulses.push({ t: Math.random(), speed: 0.15 + Math.random() * 0.1, nodeIdx: idx });
        });
      }
    };
    setupLayout();

    const draw = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      nodes.forEach((node) => {
        const cpX = (node.x + coreX) / 2;
        const cpY = node.y + (coreY - node.y) * 0.3;

        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.quadraticCurveTo(cpX, cpY, coreX, coreY);
        ctx.strokeStyle = node.color === LEFT_COLOR ? `${LEFT_COLOR}25` : `${RIGHT_COLOR}30`;
        ctx.lineWidth = node.color === LEFT_COLOR ? 1 : 1.5;
        ctx.stroke();
      });

      if (!prefersReduced) {
        pulses.forEach((pulse) => {
          pulse.t += pulse.speed * 0.016;
          if (pulse.t > 1) pulse.t -= 1;

          const node = nodes[pulse.nodeIdx];
          const cpX = (node.x + coreX) / 2;
          const cpY = node.y + (coreY - node.y) * 0.3;

          const tt = pulse.t;
          const px = (1 - tt) * (1 - tt) * node.x + 2 * (1 - tt) * tt * cpX + tt * tt * coreX;
          const py = (1 - tt) * (1 - tt) * node.y + 2 * (1 - tt) * tt * cpY + tt * tt * coreY;

          let opacity = 0.8;
          if (tt < 0.1) opacity = tt / 0.1;
          else if (tt > 0.85) opacity = (1 - tt) / 0.15;

          ctx.beginPath();
          ctx.arc(px, py, 3, 0, Math.PI * 2);
          ctx.fillStyle = node.color;
          ctx.globalAlpha = opacity;
          ctx.fill();
          ctx.globalAlpha = 1;
        });
      }

      nodes.forEach((node) => {
        const tw = ctx.measureText(node.label).width + 20;
        const th = 26;
        const rx = node.x - tw / 2;
        const ry = node.y - th / 2;

        ctx.fillStyle = `${node.color}18`;
        ctx.strokeStyle = node.color;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(rx, ry, tw, th, 4);
        ctx.fill();
        ctx.stroke();

        ctx.font = "bold 11px Inter, system-ui, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = node.color;
        ctx.fillText(node.label, node.x, node.y);
      });

      const coreRadius = 40;
      const grd = ctx.createRadialGradient(coreX, coreY, 0, coreX, coreY, coreRadius);
      grd.addColorStop(0, `${CORE_COLOR}50`);
      grd.addColorStop(0.7, `${CORE_COLOR}20`);
      grd.addColorStop(1, `${CORE_COLOR}05`);
      ctx.beginPath();
      ctx.arc(coreX, coreY, coreRadius, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();
      ctx.strokeStyle = `${CORE_COLOR}70`;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.font = "bold 18px Inter, system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#ffffff";
      ctx.fillText("KIO", coreX, coreY);

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animRef.current);
      } else {
        animRef.current = requestAnimationFrame(draw);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibility);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: "none" }}
      data-testid="hero-animation-canvas"
    />
  );
}

export function HeroAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>(0);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const pulsesRef = useRef<PulseData[]>([]);
  const coreRingRef = useRef<THREE.Mesh | null>(null);
  const outputLineRef = useRef<THREE.Mesh | null>(null);
  const clockRef = useRef(new THREE.Clock());
  const isMobileRef = useRef(false);
  const curvesRef = useRef<THREE.QuadraticBezierCurve3[]>([]);
  const cableMeshesRef = useRef<THREE.Line[]>([]);
  const [webglAvailable, setWebglAvailable] = useState(true);

  const getLayout = useCallback((width: number, height: number) => {
    const isMobile = width < 768;
    isMobileRef.current = isMobile;

    const aspect = width / height;
    const viewH = 10;
    const viewW = viewH * aspect;

    const coreX = 0;
    const coreY = isMobile ? -2.5 : -2.5;

    const leftNodes = isMobile
      ? LEFT_NODES.slice(0, 5)
      : LEFT_NODES;
    const rightNodes = isMobile
      ? RIGHT_NODES.slice(0, 3)
      : RIGHT_NODES;

    const leftX = isMobile ? -viewW * 0.38 : -viewW * 0.42;
    const rightX = isMobile ? viewW * 0.38 : viewW * 0.42;

    const leftStartY = coreY + (leftNodes.length - 1) * 0.75;
    const rightStartY = coreY + (rightNodes.length - 1) * 0.75;

    const leftPositioned: NodeDef[] = leftNodes.map((n, i) => ({
      ...n,
      x: leftX,
      y: leftStartY - i * 1.5,
      side: "left" as const,
    }));

    const rightPositioned: NodeDef[] = rightNodes.map((n, i) => ({
      ...n,
      x: rightX,
      y: rightStartY - i * 1.5,
      side: "right" as const,
    }));

    return { viewW, viewH, coreX, coreY, leftPositioned, rightPositioned, isMobile };
  }, []);

  const prefersReduced = useRef(false);

  const init = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    if (!isWebGLAvailable()) {
      setWebglAvailable(false);
      return;
    }

    prefersReduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const w = container.clientWidth;
    const h = container.clientHeight;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      setWebglAvailable(false);
      return;
    }
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(new THREE.Color(BG_COLOR), 0);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const layout = getLayout(w, h);
    const { viewW, viewH, coreX, coreY, leftPositioned, rightPositioned } = layout;

    const camera = new THREE.OrthographicCamera(
      -viewW / 2, viewW / 2,
      viewH / 2, -viewH / 2,
      0.1, 100
    );
    camera.position.z = 10;
    cameraRef.current = camera;

    const coreTex = createCoreTexture(256, 256);
    const coreSize = layout.isMobile ? 1.8 : 2.2;
    const coreMat = new THREE.SpriteMaterial({ map: coreTex, transparent: true });
    const coreSprite = new THREE.Sprite(coreMat);
    coreSprite.position.set(coreX, coreY, 0);
    coreSprite.scale.set(coreSize, coreSize, 1);
    scene.add(coreSprite);

    const ringGeo = new THREE.RingGeometry(0.55, 0.6, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(CORE_COLOR),
      transparent: true,
      opacity: 0.3,
      side: THREE.DoubleSide,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.position.set(coreX, coreY, 0.1);
    scene.add(ring);
    coreRingRef.current = ring;

    const outputGeo = new THREE.PlaneGeometry(0.03, 2.5);
    const outputMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.0,
    });
    const outputLine = new THREE.Mesh(outputGeo, outputMat);
    outputLine.position.set(coreX, coreY + 2.2, 0.1);
    scene.add(outputLine);
    outputLineRef.current = outputLine;

    const curves: THREE.QuadraticBezierCurve3[] = [];
    const cables: THREE.Line[] = [];

    const allNodes = [...leftPositioned, ...rightPositioned];
    const nodeScale = layout.isMobile ? 0.7 : 0.85;

    allNodes.forEach((node) => {
      const tex = createTextTexture(node.label, node.color, 256, 64);
      const mat = new THREE.SpriteMaterial({ map: tex, transparent: true });
      const sprite = new THREE.Sprite(mat);
      sprite.position.set(node.x, node.y, 0);
      sprite.scale.set(2.2 * nodeScale, 0.55 * nodeScale, 1);
      scene.add(sprite);

      const cpX = node.x + (coreX - node.x) * 0.5;
      const cpY = node.y + (coreY - node.y) * 0.3;

      const curve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(node.x, node.y, 0),
        new THREE.Vector3(cpX, cpY, 0),
        new THREE.Vector3(coreX, coreY, 0)
      );
      curves.push(curve);

      const points = curve.getPoints(50);
      const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
      const lineColor = node.side === "left" ? LEFT_COLOR : RIGHT_COLOR;
      const lineMat = new THREE.LineBasicMaterial({
        color: new THREE.Color(lineColor),
        transparent: true,
        opacity: node.side === "left" ? 0.15 : 0.2,
      });
      const line = new THREE.Line(lineGeo, lineMat);
      scene.add(line);
      cables.push(line);
    });

    curvesRef.current = curves;
    cableMeshesRef.current = cables;

    if (!prefersReduced.current) {
      const pulseGeo = new THREE.CircleGeometry(0.06, 16);

      allNodes.forEach((node, idx) => {
        const baseSpeed = node.side === "left" ? 0.4 : 0.28;
        const numPulses = node.side === "left" ? 2 : 1;

        for (let p = 0; p < numPulses; p++) {
          const pulseMat = new THREE.MeshBasicMaterial({
            color: new THREE.Color(node.color),
            transparent: true,
            opacity: 0.9,
          });
          const pulseMesh = new THREE.Mesh(pulseGeo, pulseMat);
          pulseMesh.position.z = 0.2;
          scene.add(pulseMesh);

          pulsesRef.current.push({
            t: p * 0.5,
            speed: baseSpeed + Math.random() * 0.08,
            curve: curves[idx],
            mesh: pulseMesh,
          });
        }
      });
    }
  }, [getLayout]);

  const isAnimatingRef = useRef(false);

  const animate = useCallback(() => {
    const renderer = rendererRef.current;
    const scene = sceneRef.current;
    const camera = cameraRef.current;
    if (!renderer || !scene || !camera) return;

    const elapsed = clockRef.current.getElapsedTime();

    if (coreRingRef.current && !prefersReduced.current) {
      coreRingRef.current.rotation.z = elapsed * 0.3;
      const scale = 1 + Math.sin(elapsed * 1.2) * 0.06;
      coreRingRef.current.scale.set(scale, scale, 1);
    }

    if (outputLineRef.current && !prefersReduced.current) {
      const mat = outputLineRef.current.material as THREE.MeshBasicMaterial;
      const cycle = (elapsed % 10) / 10;
      if (cycle > 0.5 && cycle < 0.8) {
        const progress = (cycle - 0.5) / 0.3;
        mat.opacity = Math.sin(progress * Math.PI) * 0.4;
      } else {
        mat.opacity = 0;
      }
    }

    pulsesRef.current.forEach((pulse) => {
      pulse.t += pulse.speed * 0.016;
      if (pulse.t > 1) pulse.t -= 1;

      const pos = pulse.curve.getPoint(pulse.t);
      pulse.mesh.position.set(pos.x, pos.y, 0.2);

      const mat = pulse.mesh.material as THREE.MeshBasicMaterial;
      if (pulse.t < 0.1) {
        mat.opacity = pulse.t / 0.1;
      } else if (pulse.t > 0.85) {
        mat.opacity = (1 - pulse.t) / 0.15;
      } else {
        mat.opacity = 0.85;
      }
    });

    renderer.render(scene, camera);
    animFrameRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    init();

    const handleResize = () => {
      const container = containerRef.current;
      const renderer = rendererRef.current;
      const camera = cameraRef.current;
      if (!container || !renderer || !camera) return;

      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);

      const layout = getLayout(w, h);
      camera.left = -layout.viewW / 2;
      camera.right = layout.viewW / 2;
      camera.top = layout.viewH / 2;
      camera.bottom = -layout.viewH / 2;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);

    if (!isAnimatingRef.current) {
      isAnimatingRef.current = true;
      animFrameRef.current = requestAnimationFrame(animate);
    }

    const handleVisibility = () => {
      if (document.hidden) {
        isAnimatingRef.current = false;
        cancelAnimationFrame(animFrameRef.current);
      } else if (!isAnimatingRef.current) {
        isAnimatingRef.current = true;
        clockRef.current.start();
        animFrameRef.current = requestAnimationFrame(animate);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
      isAnimatingRef.current = false;
      cancelAnimationFrame(animFrameRef.current);

      if (rendererRef.current) {
        rendererRef.current.dispose();
        if (containerRef.current && rendererRef.current.domElement.parentNode === containerRef.current) {
          containerRef.current.removeChild(rendererRef.current.domElement);
        }
      }
      if (sceneRef.current) {
        sceneRef.current.traverse((obj) => {
          if (obj instanceof THREE.Mesh || obj instanceof THREE.Line) {
            obj.geometry?.dispose();
            if (obj.material instanceof THREE.Material) {
              obj.material.dispose();
            }
          }
          if (obj instanceof THREE.Sprite) {
            obj.material.map?.dispose();
            obj.material.dispose();
          }
        });
      }
      pulsesRef.current = [];
    };
  }, [init, animate, getLayout]);

  if (!webglAvailable) {
    return (
      <div
        className="absolute inset-0 w-full h-full"
        style={{ pointerEvents: "none" }}
        data-testid="hero-animation"
      >
        <Canvas2DFallback />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: "none" }}
      data-testid="hero-animation"
    />
  );
}
