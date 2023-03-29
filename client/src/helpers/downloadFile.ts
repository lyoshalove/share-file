const downloadFile = (data: string, fileName: string) => {
  const link = document.createElement("a");

  link.href = data;
  link.download = fileName;

  document.body.appendChild(link);

  link.style.display = "none";

  link.click();
  link.remove();
};

export const downloadBlob = (data: Uint8Array, fileName: string) => {
  const blob = new Blob([data]);
  const url = URL.createObjectURL(blob);

  downloadFile(url, fileName);

  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 1000);
};
