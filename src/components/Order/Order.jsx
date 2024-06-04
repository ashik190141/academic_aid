import React, { useState } from "react";
import { useEffect } from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { dateFormatter } from "../../utils/dateFormatter";
import Swal from "sweetalert2";

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

  const handleDelivered = async (idInfo) => {
    const data = {
      orderId: idInfo.orderId,
      orderDataId: idInfo.orderDataId,
    };
    fetch(
      `http://localhost:5000/api/v1/order/order-delivered/${idInfo.orderId}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.result) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "product is delivered",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  return (
    <div className="my-10">
      <div>
        {orders?.data?.map((order) => (
          <div key={order._id}>
            <p className="py-2 flex justify-start">
              Order Date: {dateFormatter(order?.createdAt)}
            </p>
            <div className="max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-5 pb-2 text-start">
              <Card sx={{ maxWidth: 345 }}>
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
                  {order?.status == "pending" && (
                    <Button
                      onClick={() =>
                        handleDelivered({
                          orderId: order?._id,
                          orderDataId: order?.orderDataId,
                        })
                      }
                      size="small"
                    >
                      Delivered
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
