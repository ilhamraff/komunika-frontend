import dayjs from "dayjs";

export const formatDate = (date: Date | string, format = "DD MMM YYYY") => {
  return dayjs(date).format(format);
};

export const formatRupiah = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(amount);
};

export const downloadAsset = (url: string, filename: string) => {
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  link.target = "_blank";

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
};
