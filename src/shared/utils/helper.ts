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
