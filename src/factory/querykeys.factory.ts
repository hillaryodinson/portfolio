export const queryKeys = {
  fetchCategories: {
    all: ["fetchAllCategories"] as const,
  },
  fetchProjects: {
    all: ["fetchAllProjects"] as const,
    single: ["fetchProject"] as const,
  },
};
