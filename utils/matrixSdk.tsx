// components/utils/matrixSdk.ts
// Dynamic import of Matrix SDK to avoid SSR issues

let matrixSdk: any = null;

export const getMatrixSdk = async () => {
  if (matrixSdk) return matrixSdk;
  matrixSdk = await import("matrix-js-sdk");
  return matrixSdk;
};