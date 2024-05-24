import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const UserBasedDiscount = () => {
    const [id, setId] = useState(null);
    const [discount, setDiscount] = useState([])
    const [month, setMonth] = useState([])
    useEffect(() => {
        fetch("http://localhost:5000/api/v1/userDiscount/get-all-userDiscount")
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setDiscount(data?.data[0])
                setMonth(data?.data[0]?.bookshopBook);
                setId(data?.data[0]._id)
            });
    },[])
    const handleSchool = event => {
        event.preventDefault();
        const form = event.target;
        const pen =   parseInt(form.schoolPen.value);
        const paper = parseInt(form.schoolPaper.value);
        const books = parseInt(form.schoolBooks.value);

        const schoolDiscountInfo = {
            schoolPen: pen,
            schoolPaper: paper,
            schoolBook: books
        }
        fetch(
          `http://localhost:5000/api/v1/userDiscount/create-user-discount/${id}`,
          {
            method: "PUT",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(schoolDiscountInfo),
          }
        ).then((res) =>
          res.json().then((data) => {
            if (data.result) {
              form.reset();
              Swal.fire({
                title: "Success!",
                text: data.message,
                icon: "success",
                confirmButtonText: "OK!!!",
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.reload();
                }
              });
            }
          })
        );

    }

    const handleBookshop = event => {
        event.preventDefault();
        const form = event.target;
        const pen = parseInt(form.shopPen.value);
        const paper = parseInt(form.shopPaper.value);
        const jan = parseInt(form.january.value);
        const feb = parseInt(form.february.value);
        const mar = parseInt(form.march.value);
        const apr = parseInt(form.april.value);
        const may = parseInt(form.may.value);
        const jun = parseInt(form.june.value);
        const juy = parseInt(form.july.value);
        const aug = parseInt(form.august.value);
        const sep = parseInt(form.september.value);
        const oct = parseInt(form.october.value);
        const nov = parseInt(form.november.value);
        const dec = parseInt(form.december.value);

        const bookshopDiscountInfo = {
          bookshopPen: pen,
          bookshopPaper: paper,
          bookshopBook: [jan,feb,mar,apr,may,jun,juy,aug,sep,oct,nov,dec],
        };
        fetch(`http://localhost:5000/api/v1/userDiscount/create-user-discount/${id}`, {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(bookshopDiscountInfo),
        }).then((res) =>
          res.json().then((data) => {
            if (data.result) {
              form.reset();
              Swal.fire({
                title: "Success!",
                text: data.message,
                icon: "success",
                confirmButtonText: "OK!!!",
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.reload();
                }
              });
            }
          })
        );
    }
    
    return (
      <div>
        <div className="space-y-6">
          <div className="max-w-5xl mx-auto">
            <div>
              <p className="text-3xl font-serif text-start font-bold py-10">
                School Discount Section
              </p>
            </div>
            <form onSubmit={handleSchool}>
              <div className="flex items-center justify-between gap-10">
                <div className="relative w-max rounded-lg">
                  <input
                    className="peer rounded-lg border border-[#1B8EF8] bg-transparent px-4 py-2 text-[#1B8EF8] focus:outline-none"
                    type="number"
                    placeholder=""
                    defaultValue={discount?.schoolPen}
                    name="schoolPen"
                  />
                  <label
                    className="absolute -top-2 left-[10px] rounded-md px-2 text-xs text-slate-800 duration-300 peer-placeholder-shown:left-[14px] peer-placeholder-shown:top-3  peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:left-[10px] bg-sky-300"
                    htmlFor="navigate_ui_input_33"
                  >
                    Pen
                  </label>
                </div>
                <div className="relative w-max rounded-lg">
                  <input
                    className="peer rounded-lg border border-[#1B8EF8] bg-transparent px-4 py-2 text-[#1B8EF8] focus:outline-none"
                    type="number"
                    placeholder=""
                    defaultValue={discount?.schoolPaper}
                    name="schoolPaper"
                  />
                  <label
                    className="absolute -top-2 left-[10px] rounded-md px-2 text-xs text-slate-800 duration-300 peer-placeholder-shown:left-[14px] peer-placeholder-shown:top-3  peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:left-[10px] bg-sky-400"
                    htmlFor="navigate_ui_input_33"
                  >
                    Paper
                  </label>
                </div>
                <div className="relative w-max rounded-lg">
                  <input
                    className="peer rounded-lg border border-[#1B8EF8] bg-transparent px-4 py-2 text-[#1B8EF8] focus:outline-none"
                    type="number"
                    placeholder=""
                    defaultValue={discount?.schoolBook}
                    name="schoolBooks"
                  />
                  <label
                    className="absolute -top-2 left-[10px] rounded-md px-2 text-xs text-slate-800 duration-300 peer-placeholder-shown:left-[14px] peer-placeholder-shown:top-3  peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:left-[10px] bg-sky-400"
                    htmlFor="navigate_ui_input_33"
                  >
                    Books
                  </label>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button className="btn bg-sky-400 uppercase rounded-md">
                  Confirm
                </button>
              </div>
            </form>
          </div>

          {/* Book Shop */}

          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-start gap-5">
              <p className="text-3xl font-serif text-start font-bold py-10">
                Book Shop Discount Section
              </p>
            </div>
            <form onSubmit={handleBookshop}>
              <div className="flex items-center gap-10">
                <div className="relative w-max rounded-lg">
                  <input
                    className="peer rounded-lg border border-[#1B8EF8] bg-transparent px-4 py-2 text-[#1B8EF8] focus:outline-none"
                    type="number"
                    placeholder=""
                    defaultValue={discount?.bookshopPen}
                    name="shopPen"
                  />
                  <label
                    className="absolute -top-2 left-[10px] rounded-md px-2 text-xs text-slate-800 duration-300 peer-placeholder-shown:left-[14px] peer-placeholder-shown:top-3  peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:left-[10px] bg-sky-400"
                    htmlFor="navigate_ui_input_33"
                  >
                    Pen
                  </label>
                </div>
                <div className="relative w-max rounded-lg">
                  <input
                    className="peer rounded-lg border border-[#1B8EF8] bg-transparent px-4 py-2 text-[#1B8EF8] focus:outline-none"
                    type="number"
                    placeholder=""
                    defaultValue={discount?.bookshopPaper}
                    name="shopPaper"
                  />
                  <label
                    className="absolute -top-2 left-[10px] rounded-md px-2 text-xs text-slate-800 duration-300 peer-placeholder-shown:left-[14px] peer-placeholder-shown:top-3  peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:left-[10px] bg-sky-400"
                    htmlFor="navigate_ui_input_33"
                  >
                    Paper
                  </label>
                </div>
              </div>
              <div className="flex items-center justify-start gap-5">
                <p className="text-xl text-start font-bold py-10">Book</p>
              </div>
              <div className="flex items-center justify-between gap-5">
                <div className="relative w-max rounded-lg">
                  <input
                    className="peer rounded-lg border border-[#1B8EF8] bg-transparent px-4 py-2 text-[#1B8EF8] focus:outline-none"
                    type="number"
                    placeholder=""
                    defaultValue={month[0]}
                    name="january"
                  />
                  <label
                    className="absolute -top-2 left-[10px] rounded-md px-2 text-xs text-slate-800 duration-300 peer-placeholder-shown:left-[14px] peer-placeholder-shown:top-3  peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:left-[10px] bg-sky-400"
                    htmlFor="navigate_ui_input_33"
                  >
                    January
                  </label>
                </div>
                <div className="relative w-max rounded-lg">
                  <input
                    className="peer rounded-lg border border-[#1B8EF8] bg-transparent px-4 py-2 text-[#1B8EF8] focus:outline-none"
                    type="number"
                    placeholder=""
                    defaultValue={month[1]}
                    name="february"
                  />
                  <label
                    className="absolute -top-2 left-[10px] rounded-md px-2 text-xs text-slate-800 duration-300 peer-placeholder-shown:left-[14px] peer-placeholder-shown:top-3  peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:left-[10px] bg-sky-400"
                    htmlFor="navigate_ui_input_33"
                  >
                    February
                  </label>
                </div>
                <div className="relative w-max rounded-lg">
                  <input
                    className="peer rounded-lg border border-[#1B8EF8] bg-transparent px-4 py-2 text-[#1B8EF8] focus:outline-none"
                    type="number"
                    placeholder=""
                    defaultValue={month[2]}
                    name="march"
                  />
                  <label
                    className="absolute -top-2 left-[10px] rounded-md px-2 text-xs text-slate-800 duration-300 peer-placeholder-shown:left-[14px] peer-placeholder-shown:top-3  peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:left-[10px] bg-sky-400"
                    htmlFor="navigate_ui_input_33"
                  >
                    March
                  </label>
                </div>
                <div className="relative w-max rounded-lg">
                  <input
                    className="peer rounded-lg border border-[#1B8EF8] bg-transparent px-4 py-2 text-[#1B8EF8] focus:outline-none"
                    type="number"
                    defaultValue={month[3]}
                    placeholder=""
                    name="april"
                  />
                  <label
                    className="absolute -top-2 left-[10px] rounded-md px-2 text-xs text-slate-800 duration-300 peer-placeholder-shown:left-[14px] peer-placeholder-shown:top-3  peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:left-[10px] bg-sky-400"
                    htmlFor="navigate_ui_input_33"
                  >
                    April
                  </label>
                </div>
              </div>
              <div className="flex items-center justify-between gap-5 pt-5">
                <div className="relative w-max rounded-lg">
                  <input
                    className="peer rounded-lg border border-[#1B8EF8] bg-transparent px-4 py-2 text-[#1B8EF8] focus:outline-none"
                    type="number"
                    placeholder=""
                    defaultValue={month[4]}
                    name="may"
                  />
                  <label
                    className="absolute -top-2 left-[10px] rounded-md px-2 text-xs text-slate-800 duration-300 peer-placeholder-shown:left-[14px] peer-placeholder-shown:top-3  peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:left-[10px] bg-sky-400"
                    htmlFor="navigate_ui_input_33"
                  >
                    May
                  </label>
                </div>
                <div className="relative w-max rounded-lg">
                  <input
                    className="peer rounded-lg border border-[#1B8EF8] bg-transparent px-4 py-2 text-[#1B8EF8] focus:outline-none"
                    type="number"
                    placeholder=""
                    defaultValue={month[5]}
                    name="june"
                  />
                  <label
                    className="absolute -top-2 left-[10px] rounded-md px-2 text-xs text-slate-800 duration-300 peer-placeholder-shown:left-[14px] peer-placeholder-shown:top-3  peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:left-[10px] bg-sky-400"
                    htmlFor="navigate_ui_input_33"
                  >
                    June
                  </label>
                </div>
                <div className="relative w-max rounded-lg">
                  <input
                    className="peer rounded-lg border border-[#1B8EF8] bg-transparent px-4 py-2 text-[#1B8EF8] focus:outline-none"
                    type="number"
                    placeholder=""
                    defaultValue={month[6]}
                    name="july"
                  />
                  <label
                    className="absolute -top-2 left-[10px] rounded-md px-2 text-xs text-slate-800 duration-300 peer-placeholder-shown:left-[14px] peer-placeholder-shown:top-3  peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:left-[10px] bg-sky-400"
                    htmlFor="navigate_ui_input_33"
                  >
                    July
                  </label>
                </div>
                <div className="relative w-max rounded-lg">
                  <input
                    className="peer rounded-lg border border-[#1B8EF8] bg-transparent px-4 py-2 text-[#1B8EF8] focus:outline-none"
                    type="number"
                    defaultValue={month[7]}
                    placeholder=""
                    name="august"
                  />
                  <label
                    className="absolute -top-2 left-[10px] rounded-md px-2 text-xs text-slate-800 duration-300 peer-placeholder-shown:left-[14px] peer-placeholder-shown:top-3  peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:left-[10px] bg-sky-400"
                    htmlFor="navigate_ui_input_33"
                  >
                    August
                  </label>
                </div>
              </div>
              <div className="flex items-center justify-between gap-5 pt-5">
                <div className="relative w-max rounded-lg">
                  <input
                    className="peer rounded-lg border border-[#1B8EF8] bg-transparent px-4 py-2 text-[#1B8EF8] focus:outline-none"
                    type="number"
                    placeholder=""
                    defaultValue={month[8]}
                    name="september"
                  />
                  <label
                    className="absolute -top-2 left-[10px] rounded-md px-2 text-xs text-slate-800 duration-300 peer-placeholder-shown:left-[14px] peer-placeholder-shown:top-3  peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:left-[10px] bg-sky-400"
                    htmlFor="navigate_ui_input_33"
                  >
                    September
                  </label>
                </div>
                <div className="relative w-max rounded-lg">
                  <input
                    className="peer rounded-lg border border-[#1B8EF8] bg-transparent px-4 py-2 text-[#1B8EF8] focus:outline-none"
                    type="number"
                    placeholder=""
                    defaultValue={month[9]}
                    name="october"
                  />
                  <label
                    className="absolute -top-2 left-[10px] rounded-md px-2 text-xs text-slate-800 duration-300 peer-placeholder-shown:left-[14px] peer-placeholder-shown:top-3  peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:left-[10px] bg-sky-400"
                    htmlFor="navigate_ui_input_33"
                  >
                    October
                  </label>
                </div>
                <div className="relative w-max rounded-lg">
                  <input
                    className="peer rounded-lg border border-[#1B8EF8] bg-transparent px-4 py-2 text-[#1B8EF8] focus:outline-none"
                    type="number"
                    placeholder=""
                    defaultValue={month[10]}
                    name="november"
                  />
                  <label
                    className="absolute -top-2 left-[10px] rounded-md px-2 text-xs text-slate-800 duration-300 peer-placeholder-shown:left-[14px] peer-placeholder-shown:top-3  peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:left-[10px] bg-sky-400"
                    htmlFor="navigate_ui_input_33"
                  >
                    November
                  </label>
                </div>
                <div className="relative w-max rounded-lg">
                  <input
                    className="peer rounded-lg border border-[#1B8EF8] bg-transparent px-4 py-2 text-[#1B8EF8] focus:outline-none"
                    type="number"
                    defaultValue={month[11]}
                    placeholder=""
                    name="december"
                  />
                  <label
                    className="absolute -top-2 left-[10px] rounded-md px-2 text-xs text-slate-800 duration-300 peer-placeholder-shown:left-[14px] peer-placeholder-shown:top-3  peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:left-[10px] bg-sky-400"
                    htmlFor="navigate_ui_input_33"
                  >
                    December
                  </label>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button className="btn bg-sky-400 uppercase rounded-md">
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
};

export default UserBasedDiscount;