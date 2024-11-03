export function isValidHTML(content: string): boolean {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const parserErrors = doc.getElementsByTagName('parsererror');
    return parserErrors.length === 0;
  } catch (error) {
    return false;
  }
}

export function validateLayout(layout: string): boolean {
  return ['responsive', 'fixed'].includes(layout);
}

export function validateZoom(zoom: number): boolean {
  return zoom >= 0.5 && zoom <= 2;
} 