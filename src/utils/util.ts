export function getFormData(e: SubmitEvent): Record<string, any> {
  const data = new FormData(e.target as HTMLFormElement);
  const res: Record<string, any> = {};

  for (const [k, v] of data.entries()) {
    res[k] = v;
  }

  return res;
}
