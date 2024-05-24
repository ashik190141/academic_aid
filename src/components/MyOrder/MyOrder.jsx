import React, { useState } from 'react';
import { useEffect } from 'react';
import { dateFormatter } from '../../utils/dateFormatter';
import { userEmail } from '../../utils/userInfo';

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const MyOrder = () => {
    let key = null;
    if (localStorage.getItem("key")) {
      key = localStorage.getItem("key");
    }
    const email = userEmail(key);

    const [orders, setOrders] = useState([]);
    // const [records, setRecords] = useState([]);

    useEffect(() => {
      fetch(`http://localhost:5000/api/v1/order/my-orders/${email}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setOrders(data);
          // setRecords(data);
        });
    }, [email]);
    return (
      <div className="my-10">
        <div>
          {orders?.data?.map((order) => (
            <div key={order._id}>
              <p className="py-2 flex justify-start">
                Order Date: {dateFormatter(order?.createdAt)}
              </p>
              <div className="max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-5 pb-2">
                {order?.data?.map((data) => (
                  <Card sx={{ maxWidth: 345 }} key={data?._id}>
                    <CardMedia
                      sx={{ height: 140 }}
                      image={data?.image}
                      title="product_img"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div">
                        {data?.name}
                      </Typography>
                      <Typography gutterBottom variant="h6" component="div">
                        {order?.email}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        $ {data?.price}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">{data?.status}</Button>
                      {data?.status != "pending" && (
                        <Button
                          onClick={() => openModal(data?.id)}
                          size="small"
                        >
                          Review
                        </Button>
                      )}
                    </CardActions>
                  </Card>
                ))}
              </div>
              <p className="py-2 pb-10 flex justify-start">Total Price: {order?.totalPrice}</p>
            </div>
          ))}
        </div>
      </div>
    );
};

export default MyOrder;