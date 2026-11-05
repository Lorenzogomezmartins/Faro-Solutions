"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { projectGroups, type Project, type ProjectGroup } from "@/content/projects";
import { cn } from "@/lib/utils";
import { ProjectCard } from "./ProjectCard";

type Filter = "Todos" | ProjectGroup;

/** Grilla del portfolio completo con filtros por tipo de proyecto. */
export function PortfolioGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>("Todos");
  const filters: Filter[] = ["Todos", ...projectGroups.filter((group) => projects.some((p) => p.group === group))];
  const visible = filter === "Todos" ? projects : projects.filter((project) => project.group === filter);

  return (
    <>
      <div role="group" aria-label="Filtrar proyectos" className="flex flex-wrap gap-2">
        {filters.map((item) => {
          const active = item === filter;
          const count = item === "Todos" ? projects.length : projects.filter((p) => p.group === item).length;
          return (
            <button
              key={item}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(item)}
              className={cn(
                "relative rounded-full border px-4 py-2 text-sm transition-colors duration-300",
                active ? "border-pearl text-obsidian" : "border-line text-silver/80 hover:border-silver/40 hover:text-pearl",
              )}
            >
              {active && (
                <motion.span
                  layoutId="portfolio-filter"
                  className="absolute inset-0 -z-10 rounded-full bg-pearl"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              {item} <span className={active ? "text-obsidian/60" : "text-mist"}>{count}</span>
            </button>
          );
        })}
      </div>

      <motion.ul layout className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((project, index) => (
            <motion.li
              key={project.slug}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.45, delay: Math.min(index, 6) * 0.04, ease: [0.16, 1, 0.3, 1] }}
              className="h-full"
            >
              <ProjectCard project={project} priority={index < 3} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </>
  );
}
