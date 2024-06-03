import React, { useState } from "react";
import { useEffect } from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { dateFormatter } from "../../utils/dateFormatter";

const Order = () => {
  const [orders, setOrders] = useState([]);
  // const [records, setRecords] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/order/all-orders`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setOrders(data);
        // setRecords(data);
      });
  }, []);
  return (
    <div className="my-10">
      <div>
        {orders?.data?.map((order) => (
          <div key={order._id}>
            <p className="py-2 flex justify-start">
              Order Date: {dateFormatter(order?.createdAt)}
            </p>
            <div className="max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-5 pb-2 text-start">
              <Card sx={{ maxWidth: 345 }} key={order?._id}>
                <CardMedia
                  sx={{ height: 140 }}
                  image={order?.image}
                  title="product_img"
                />
                <CardContent>
                  <div className="flex justify-between">
                    <Typography variant="h6" component="div">
                      {order?.name}
                    </Typography>
                    <Typography variant="h6" component="div">
                      {order?.quantity}
                    </Typography>
                  </div>
                  <Typography variant="h6" color="text.secondary">
                    $ {order?.price}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">{order?.status}</Button>
                  {order?.status != "pending" && (
                    <Button onClick={() => openModal(data?.id)} size="small">
                      Review
                    </Button>
                  )}
                </CardActions>
              </Card>
            </div>
            <p className="py-2 pb-10 flex justify-start">
              Total Price: {order?.totalPrice}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
