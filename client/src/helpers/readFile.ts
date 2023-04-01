import { socket } from '@/helpers';

export const readFile = (roomCode: string, file: File) => {
  const fileReader = new FileReader();
  let rawData = new ArrayBuffer(8);

  fileReader.onload = (event) => {
    rawData = event.target?.result as ArrayBuffer;
    socket.emit("send-file", {
      id: roomCode,
      data: rawData,
      fileName: file.name,
    });
  };

  fileReader.readAsArrayBuffer(file);
};
