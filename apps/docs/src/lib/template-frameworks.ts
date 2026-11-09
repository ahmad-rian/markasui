/** Framework yang sudah punya versi template (templates/<slug>/<fw>/). Tanpa import Node, aman untuk klien. */
export const TEMPLATE_FRAMEWORKS = ["blade", "react", "vue"] as const;
export type TemplateFramework = (typeof TEMPLATE_FRAMEWORKS)[number];
