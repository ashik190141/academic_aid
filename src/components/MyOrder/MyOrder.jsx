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

import Modal from "react-modal";
import ReturnOrderModal from './ReturnOrderModal';

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const MyOrder = () => {
    let key = null;
    let p=0;
    if (localStorage.getItem("key")) {
      key = localStorage.getItem("key");
      p = localStorage.getItem("price");
    }
    const email = userEmail(key);

    const [orders, setOrders] = useState([]);
    const [orderId, setOrderId] = useState(null);
    const [orderDataId, setOrderDataId] = useState(null);
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal(id, orderDataId) {
      setOrderId(id);
      setOrderDataId(orderDataId);
      setIsOpen(true);
    }

    function closeModal() {
      setIsOpen(false);
    }

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
              <div className="max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-5 pb-2 text-start">
                <Card sx={{ maxWidth: 345 }} key={order?._id}>
                  <CardMedia
                    sx={{ height: 140 }}
                    image={order?.image}
                    title="product_img"
                  />
                  <CardContent>
                    <div className="flex justify-between">
                      <Typography gutterBottom variant="h6" component="div">
                        {order?.name}
                      </Typography>
                      <Typography gutterBottom variant="h6" component="div">
                        {order?.quantity}
                      </Typography>
                    </div>
                    <Typography variant="h6" color="text.secondary">
                      $ {order?.price}
                    </Typography>
                  </CardContent>
                  <CardActions className="flex justify-between">
                    <Button size="small">{order?.status}</Button>
                    {order?.status != "pending" && (
                      <Button
                        onClick={() =>
                          openModal(order?.orderId, order?.orderDataId)
                        }
                        size="small"
                      >
                        return
                      </Button>
                    )}
                  </CardActions>
                </Card>
              </div>
              <p className="py-2 pb-10 flex justify-start">
                Total Price: {order?.totalPrice-p}
              </p>
            </div>
          ))}
        </div>
        <div>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <div className="flex justify-end">
              <button
                className="text-xl border border-black px-5"
                onClick={closeModal}
              >
                X
              </button>
            </div>
            <div>
              <ReturnOrderModal
                orderId={orderId}
                closeModal={closeModal}
                orderDataId={orderDataId}
              ></ReturnOrderModal>
            </div>
          </Modal>
        </div>
      </div>
    );
};

export default MyOrder;