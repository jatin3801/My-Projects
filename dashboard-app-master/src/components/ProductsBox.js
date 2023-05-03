import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { Typography, Box } from "@mui/joy";
import StarIcon from "@mui/icons-material/Star";
import { useSelector } from "react-redux";
import CategoryIcon from "@mui/icons-material/Category";

function ProductsBox() {
  const productList = useSelector(
    (state) => state.productsList.productsListData
  );
  const query = useSelector((state) => state.productsList.query);

  const filteredList = React.useMemo(
    () =>
      productList.filter((product) => {
        const queryLowerCase = query.toLowerCase().trim();
        return product.title.toLowerCase().includes(queryLowerCase);
      }),
    [productList, query]
  );

  const shownList = query.trim().length ? filteredList : productList;

  return (
    <Box border='2px solid grey'>
      <ImageList
        cols={4}
        gap={6}
        rowHeight={"auto"}
        sx={{ backgroundColor: "white", padding: "33px", margin: "auto" }}
      >
        {shownList.map(({ id, title, thumbnail, category, rating, price }) => (
          <ImageListItem
            key={id}
            rows={10}
            sx={{
              display: "flex",
              backgroundColor: "#f3f3f3",
            }}
          >
            <img src={thumbnail} alt={title} loading='lazy' />
            <Typography fontSize={18} fontWeight={600} fontFamily='cursive'>
              {title}
            </Typography>
            <Typography fontSize={18} fontWeight={400} fontFamily='sans-serif'>
              <CategoryIcon /> {category}
            </Typography>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span
                style={{
                  border: "1px solid white",
                  backgroundColor: "black",
                  height: "20px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "5px",
                }}
              >
                <Typography fontSize='medium' sx={{ color: "whitesmoke" }}>
                  {rating}
                </Typography>
                <StarIcon sx={{ color: "white" }} fontSize='small' />
              </span>
              <Typography fontWeight={800}>
                {"₹"}
                {price}{" "}
              </Typography>
            </div>
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}

export default ProductsBox;
