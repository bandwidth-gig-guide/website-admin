const SUFFIX: Record<string, string> = {
  Id: "ID",
  Ids: "IDs",
  Url: "URL",
  Urls: "URLs",
};

function pascalcaseKey(key: string): string {

  // Split camelCase/PascalCase key into parts
  const parts = key.replace(/([a-z0-9])([A-Z])/g, "$1 $2").split(/[^a-zA-Z0-9]+|(?=[A-Z])/).filter(Boolean);

  if (parts.length === 0) return key;

  // PascalCase all parts except last
  const allButLast = parts.slice(0, -1).map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase());

  // Check last part for mapping
  const lastPart = parts[parts.length - 1];
  const mappedLast = SUFFIX[lastPart] ?? (lastPart.charAt(0).toUpperCase() + lastPart.slice(1).toLowerCase());

  return [...allButLast, mappedLast].join("");
}

export function pascalcaseKeys(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(pascalcaseKeys);
  } else if (obj !== null && typeof obj === "object") {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      acc[pascalcaseKey(key)] = pascalcaseKeys(value);
      return acc;
    }, {} as Record<string, any>);
  }
  return obj;
}
