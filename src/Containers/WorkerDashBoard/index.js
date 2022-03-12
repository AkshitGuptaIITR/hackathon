import { Table } from "antd";
import React, { useEffect, useState } from "react";
import dateConverter from "../../Common/convertDate";
import { AxiosGet, AxiosPatch } from "../../Components/Apicaller";
import { Button, Wrapper } from "../../Components/ExportStyles";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import style from "./index.module.css";

const WorkerDashboard = () => {
  const [onGoingOrder, setOnGoingOrder] = useState([]);
  const [completedOrder, setCompletedOrder] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentProcess, setCurrentProcess] = useState("onGoing");
  const [processingOrder, setProcessingOrder] = useState([]);
  const [timeEstimated, setTimeEstimated] = useState(null);

  const columns = [
    {
      title: "OrderId",
      key: "id",
      dataIndex: "_id",
    },
    {
      title: "Customer Name",
      key: "name",
      dataIndex: "user.name",
    },
    {
      title: "Order Time",
      key: "time",
      dataIndex: "createdAt",
    },
    {
      title: "Payment Mode",
      key: "modeOfPayment",
      dataIndex: "modeOfPayment",
    },
    {
      title: "Total Price",
      key: "totalPrice",
      dataIndex: "totalPrice",
    },
    {
      title: "Comment",
      key: "comment",
      dataIndex: "comment",
    },
  ];

  const handleChange = (e) => {
    e.preventDefault();
    setTimeEstimated(e.target.value);
  };

  console.log(timeEstimated)

  const handleSelection = async (id, accepted) => {
    setLoading(true);
    try {
      const response = await AxiosPatch(
        `https://grub-it.herokuapp.com/api/v1/orders/${id}`,
        {
          accepted,
          timeEstimated: timeEstimated || 10,
        }
      );
      setOnGoingOrder(
        response.data.data.onGoingOrders.map((data) => {
          data.createdAt = dateConverter(data.createdAt);
          return data;
        })
      );
      setCompletedOrder(
        response.data.data.completedOrder.map((data) => {
          data.createdAt = dateConverter(data.createdAt);
          return data;
        })
      );
      setProcessingOrder(
        response.data.data.processingData.map((data) => {
          data.createdAt = dateConverter(data.createdAt);
          return data;
        })
      );
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await AxiosGet(
          `https://grub-it.herokuapp.com/api/v1/orders/622c9f26b0bdf47b2307940f/622caa2d3b41d0c1c3164a0c`
        );
        setOnGoingOrder(
          response.data.data.onGoingOrders.map((data) => {
            data.createdAt = dateConverter(data.createdAt);
            return data;
          })
        );
        setCompletedOrder(
          response.data.data.completedOrder.map((data) => {
            data.createdAt = dateConverter(data.createdAt);
            return data;
          })
        );
        setProcessingOrder(
          response.data.data.processingData.map((data) => {
            data.createdAt = dateConverter(data.createdAt);
            return data;
          })
        );
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    })();
  }, []);

  console.log(processingOrder);

  return (
    <>
      <Header />
      <Wrapper>
        <div className={style.tableContent}>
          <div style={{ width: "80%" }}>
            <div className={style.process}>
              <p
                style={{
                  border: `${
                    currentProcess === "onGoing" ? "1.5px solid #FE724D" : ""
                  }`,
                  color: `${currentProcess === "onGoing" ? "#FE724D" : ""}`,
                }}
                onClick={() => {
                  setCurrentProcess("onGoing");
                }}
              >
                Ongoing Orders
              </p>
              <p
                style={{
                  border: `${
                    currentProcess === "completed" ? "1.5px solid #FE724D" : ""
                  }`,
                  color: `${currentProcess === "completed" ? "#FE724D" : ""}`,
                }}
                onClick={() => {
                  setCurrentProcess("completed");
                }}
              >
                Completed Orders
              </p>
            </div>
            <Table
              columns={columns}
              dataSource={
                currentProcess === "onGoing" ? onGoingOrder : completedOrder
              }
              loading={loading}
            />
          </div>
          <div className={style.orderSide}>
            <h2>Incoming orders</h2>
            {processingOrder.map((data, index) => {
              return (
                <div className={style.card} key={index}>
                  <div className={style.left}>
                    <div>
                      <h2>{data.user.name}</h2>
                      <p>
                        {data.orderDetail.map((orderData) => {
                          return <>{orderData.name},</>;
                        })}
                      </p>
                      <p>Payment Mode: {data.modeOfPayment}</p>
                    </div>
                    <input
                      type="number"
                      onClick={handleChange}
                      className={style.input}
                      placeholder="Expected Time"
                    />
                  </div>
                  <div className={style.right}>
                    <div>
                      <p>Total Price:</p>
                      <b>{data.totalPrice}</b>
                    </div>
                    <div>
                      <Button
                        style={{
                          background: "#FE724D",
                          width: 96,
                          height: 32,
                          padding: "8px 26px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          textTransform: "capitalize",
                          letterSpacing: 0.9,
                          marginBottom: 8,
                        }}
                        onClick={() => handleSelection(data._id, "accepted")}
                      >
                        Accept
                      </Button>
                      <Button
                        style={{
                          background: "none",
                          width: 96,
                          height: 32,
                          padding: "8px 26px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          textTransform: "capitalize",
                          letterSpacing: 0.9,
                        }}
                        onClick={() => handleSelection(data._id, "declined")}
                      >
                        Decline
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Wrapper>
      <Footer />
    </>
  );
};

export default WorkerDashboard;
