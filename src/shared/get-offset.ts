interface IGetOffset {
  page: number;
  pageSize: number;
}

export const getOffset = ({ page, pageSize }: IGetOffset) => {
  return pageSize * (page - 1);
};
