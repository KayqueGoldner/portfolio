"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import cssLogo from "../../public/icons/css3-plain.svg";
import htmlLogo from "../../public/icons/html5-plain.svg";
import jsLogo from "../../public/icons/javascript-plain.svg";
import reactLogo from "../../public/icons/react-original.svg";
import tsLogo from "../../public/icons/typescript-plain.svg";
import tailwindLogo from "../../public/icons/tailwindcss-original.svg";
import nextLogo from "../../public/icons/nextjs-plain.svg";

interface LogoItem {
  src: any;
  alt: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
}

export const BackgroundIconsEffect = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [logos, setLogos] = useState<LogoItem[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [scrollY, setScrollY] = useState(0);
  const prevScrollY = useRef(0);

  // Inicializar os logos com posições e velocidades aleatórias
  useEffect(() => {
    if (typeof window === "undefined") return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    setDimensions({ width, height });
    setScrollY(window.scrollY);
    prevScrollY.current = window.scrollY;

    const logoSources = [
      { src: htmlLogo, alt: "HTML" },
      { src: cssLogo, alt: "CSS" },
      { src: jsLogo, alt: "JavaScript" },
      { src: tsLogo, alt: "TypeScript" },
      { src: reactLogo, alt: "React" },
      { src: tailwindLogo, alt: "Tailwind CSS" },
      { src: nextLogo, alt: "Next.js" },
    ];

    const initialLogos = logoSources.map((logo) => ({
      ...logo,
      x: Math.random() * width,
      y: Math.random() * height + window.scrollY,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: 30 + Math.random() * 30,
    }));

    setLogos(initialLogos);
  }, []);

  // Lidar com movimento do mouse
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Lidar com rolagem da página
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);

      // Calcular a velocidade de rolagem
      const scrollSpeed = currentScrollY - prevScrollY.current;
      prevScrollY.current = currentScrollY;

      // Aplicar impulso aos logos baseado na velocidade de rolagem
      if (Math.abs(scrollSpeed) > 5) {
        // Limitar a velocidade máxima de rolagem para o cálculo do impulso
        const cappedScrollSpeed =
          Math.sign(scrollSpeed) * Math.min(Math.abs(scrollSpeed), 20);

        setLogos((prevLogos) =>
          prevLogos.map((logo) => {
            // Verificar se o logo está próximo da borda superior ou inferior
            const isNearTopBoundary = Math.abs(logo.y - currentScrollY) < 50;
            const isNearBottomBoundary =
              Math.abs(logo.y - (currentScrollY + dimensions.height)) < 50;

            if (isNearTopBoundary || isNearBottomBoundary) {
              // Aplicar impulso baseado na direção e velocidade da rolagem (com limite)
              return {
                ...logo,
                vy: logo.vy + cappedScrollSpeed * (Math.random() * 0.3 + 0.2),
                vx:
                  logo.vx +
                  (Math.random() - 0.5) * Math.abs(cappedScrollSpeed) * 0.3,
              };
            }
            return logo;
          }),
        );
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dimensions]);

  // Lidar com redimensionamento da janela
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Animação principal
  useEffect(() => {
    if (logos.length === 0) return;

    const animate = () => {
      setLogos((prevLogos) => {
        // Primeiro passo: atualizar posições e velocidades
        const updatedLogos = prevLogos.map((logo) => {
          let { x, y, vx, vy, size } = logo;

          // Aplicar efeito de repulsão do mouse (quando próximo)
          const mouseDistance = Math.sqrt(
            Math.pow(mousePosition.x - x - size / 2, 2) +
              Math.pow(mousePosition.y - y + scrollY - size / 2, 2),
          );

          // Reduzir o raio de interação do mouse
          if (mouseDistance < 100) {
            // Reduzido de 150 para 100
            const angle = Math.atan2(
              y - scrollY - mousePosition.y + size / 2,
              x - mousePosition.x + size / 2,
            );
            const repulsionForce = (100 - mouseDistance) / 200; // Ajustado para o novo raio
            vx += Math.cos(angle) * repulsionForce;
            vy += Math.sin(angle) * repulsionForce;
          }

          // Limitar velocidade máxima para evitar movimentos muito rápidos
          const maxSpeed = 8;
          const currentSpeed = Math.sqrt(vx * vx + vy * vy);
          if (currentSpeed > maxSpeed) {
            vx = (vx / currentSpeed) * maxSpeed;
            vy = (vy / currentSpeed) * maxSpeed;
          }

          // Aplicar velocidade
          x += vx;
          y += vy;

          // Colisão com as bordas laterais
          if (x < 0 || x > dimensions.width - size) {
            vx = -vx * 0.8;
            x = x < 0 ? 0 : dimensions.width - size;
          }

          // Colisão com o topo e o fundo da viewport com efeito de "arremesso"
          const topBoundary = scrollY;
          const bottomBoundary = scrollY + dimensions.height - size;

          if (y < topBoundary) {
            // Colisão com o topo - "arremesso" para baixo
            y = topBoundary;
            vy = Math.abs(vy) * 0.9 + Math.random() * 2; // Adiciona um componente aleatório
            vx += (Math.random() - 0.5) * 2; // Adiciona movimento lateral aleatório
          } else if (y > bottomBoundary) {
            // Colisão com o fundo - "arremesso" para cima
            y = bottomBoundary;
            vy = -Math.abs(vy) * 0.9 - Math.random() * 2; // Adiciona um componente aleatório
            vx += (Math.random() - 0.5) * 2; // Adiciona movimento lateral aleatório
          }

          // Aplicar atrito para evitar movimento perpétuo, mas não tanto
          vx *= 0.995;
          vy *= 0.995;

          return { ...logo, x, y, vx, vy };
        });

        // Segundo passo: detectar e resolver colisões entre logos
        for (let i = 0; i < updatedLogos.length; i++) {
          for (let j = i + 1; j < updatedLogos.length; j++) {
            const logo1 = updatedLogos[i];
            const logo2 = updatedLogos[j];

            // Calcular distância entre os centros dos logos
            const dx = logo2.x + logo2.size / 2 - (logo1.x + logo1.size / 2);
            const dy = logo2.y + logo2.size / 2 - (logo1.y + logo1.size / 2);
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Verificar se há colisão (considerando os raios dos logos)
            const minDistance = (logo1.size + logo2.size) / 2;

            if (distance < minDistance) {
              // Calcular vetor de colisão normalizado
              const nx = dx / distance;
              const ny = dy / distance;

              // Calcular a sobreposição
              const overlap = minDistance - distance;

              // Separar os logos proporcionalmente aos seus tamanhos
              const totalSize = logo1.size + logo2.size;
              const ratio1 = logo2.size / totalSize;
              const ratio2 = logo1.size / totalSize;

              // Mover os logos para evitar sobreposição
              updatedLogos[i] = {
                ...logo1,
                x: logo1.x - nx * overlap * ratio1,
                y: logo1.y - ny * overlap * ratio1,
              };

              updatedLogos[j] = {
                ...logo2,
                x: logo2.x + nx * overlap * ratio2,
                y: logo2.y + ny * overlap * ratio2,
              };

              // Calcular velocidade relativa na direção da colisão
              const vx1 = logo1.vx;
              const vy1 = logo1.vy;
              const vx2 = logo2.vx;
              const vy2 = logo2.vy;

              const vRelativeX = vx1 - vx2;
              const vRelativeY = vy1 - vy2;

              // Calcular impulso da colisão com um fator de elasticidade aumentado
              const elasticity = 1.5; // Aumentar para mais "quicada"
              const impactVelocity = Math.sqrt(
                vRelativeX * vRelativeX + vRelativeY * vRelativeY,
              );
              const impulse = (vRelativeX * nx + vRelativeY * ny) * elasticity;

              // Adicionar um componente aleatório para tornar as colisões mais interessantes
              const randomFactor = 0.5 + Math.random() * 0.5; // Entre 0.5 e 1.0

              // Aplicar impulso às velocidades com um efeito mais dramático
              const impulseX = impulse * nx * randomFactor;
              const impulseY = impulse * ny * randomFactor;

              // Adicionar um pequeno "empurrão" extra na direção perpendicular
              const perpX = -ny * impactVelocity * 0.2 * (Math.random() - 0.5);
              const perpY = nx * impactVelocity * 0.2 * (Math.random() - 0.5);

              updatedLogos[i] = {
                ...updatedLogos[i],
                vx: vx1 - impulseX + perpX,
                vy: vy1 - impulseY + perpY,
              };

              updatedLogos[j] = {
                ...updatedLogos[j],
                vx: vx2 + impulseX - perpX,
                vy: vy2 + impulseY - perpY,
              };
            }
          }
        }

        return updatedLogos;
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [logos, mousePosition, dimensions, scrollY]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {logos.map((logo, index) => {
        // Calcular a distância do mouse para determinar a animação
        const mouseDistance = Math.sqrt(
          Math.pow(mousePosition.x - logo.x - logo.size / 2, 2) +
            Math.pow(mousePosition.y + scrollY - logo.y - logo.size / 2, 2),
        );

        // Determinar se deve aplicar a animação e sua duração
        const maxAnimationDistance = 120; // Reduzido de 200 para 120
        const minDuration = 300; // Duração mínima em ms
        const maxDuration = 1000; // Duração máxima em ms

        // Calcular a duração baseada na distância (mais perto = mais rápido)
        const animationDuration =
          mouseDistance < maxAnimationDistance
            ? Math.max(
                minDuration,
                maxDuration -
                  (maxDuration - minDuration) *
                    (1 - mouseDistance / maxAnimationDistance),
              )
            : 0; // 0 significa sem animação

        // Estilo personalizado para a animação
        const animationStyle =
          mouseDistance < maxAnimationDistance
            ? {
                animation: `wiggle ${animationDuration}ms ease-in-out infinite`,
              }
            : {};

        return (
          <div
            key={index}
            style={{
              position: "absolute",
              left: `${logo.x}px`,
              top: `${logo.y - scrollY}px`,
              width: `${logo.size}px`,
              height: `${logo.size}px`,
              transition: "transform 0.1s ease-out",
              opacity: 0.2,
              ...animationStyle,
            }}
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              fill
              style={{ objectFit: "contain" }}
              className={`${mouseDistance < maxAnimationDistance ? "animate-wiggle" : ""} dark:invert`}
            />
          </div>
        );
      })}
    </div>
  );
};
