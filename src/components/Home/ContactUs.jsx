import '../../App.css'
import { IoMdPin } from "react-icons/io";
import { IoCall } from "react-icons/io5";
import { MdEmail } from "react-icons/md";

const ContactUs = () => {
  return (
    <div className='font-play my-16'>
      <div>
        <div className='space-y-2'>
          <p className="text-4xl text-[#2d4739] font-bold text-center">Get In Touch</p>
          <p className='text-[#2d4739] text-center'> Reach out, bridge the gap, foster connections, and ignite collaboration. Let's get in touch and make great things happen together. </p>
        </div>
        <div className='flex gap-5 my-10 items-center text-[#121619] justify-center '>
          <div className='bg-[#e2b458] rounded-md w-96 h-[220px]'>
            <div className='flex flex-col p-16 items-center space-y-2 justify-center'>
              <IoMdPin className='text-3xl' />
              <p className='text-center'> Mirpur 10,House-190
                Road-02,Dhaka</p>
            </div>
          </div>
          <div className='bg-[#e2b458] rounded-md w-96  h-[220px]'>
            <div className='flex flex-col p-20 items-center space-y-2 justify-center'>
              <IoCall className='text-3xl' />
              <p className='text-center'> +8801700324564</p>
            </div>
          </div>
          <div className='bg-[#e2b458] rounded-md w-96  h-[220px]'>
            <div className='flex flex-col p-20 items-center space-y-2 justify-center'>
              <MdEmail className='text-3xl' />
              <p className='text-center'>info@gmail.com</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="w-full mx-auto lg:w-[1200px] shadow-lg bg-white flex group text-[#2d4739]">
          <div className="w-1/2 min-h-full bg-[#e2b458] relative overflow-hidden hidden lg:block">
            <h1 className="text-[#2d4739] text-2xl absolute bottom-3 right-3 text-right">Hey! <br /> Welcome to<br /> Grocery Gateway</h1>
            <span className="bg-amber-600/20 w-32 h-32 -top-8 -left-8 rounded-full absolute z-20 group-hover:w-56 group-hover:h-56 duration-500"></span>
            <span className="bg-amber-600/50 w-36 h-36 -top-5 -left-5  rounded-full absolute z-10"></span>
          </div>
          <form className="p-8 flex-1">
            <h1 className="text-4xl pb-4">Send Us</h1>
            <div className="space-y-5">
              <label htmlFor="email_" className="block">Name</label>
              <input id="name_" type="text" placeholder="Enter Your Name" className="p-3 block w-full shadow-lg outline-none border-2 rounded-md border-dotted  invalid:border-red-700 valid:border-[#2d4739]" />

              <label htmlFor="email_" className="block">Email</label>
              <input id="email_" type="email" placeholder="example@example.com" className="p-3 block w-full shadow-lg outline-none border-2 rounded-md border-dotted  invalid:border-red-700 valid:border-[#2d4739]" />
              
              <label htmlFor="password_" className="block">Your Message</label>
              <input id="subject_" type="text" placeholder="Enter Your Message" min={5} className="p-3 block w-full shadow-lg outline-none border-2 rounded-md border-dotted invalid:border-red-700 valid:border-[#2d4739]" />
            </div>
            {/* button type will be submit for handling form submission*/}
            <button type="button" className="py-2 px-5 mb-4 mt-8 overflow-hidden shadow-lg border-2 rounded-md border-dashed border-[#2d4739] before:block before:absolute before:translate-x-full before:inset-0 before:bg-[#2d4739] before:hover:translate-x-0  before:duration-300 before:rounded-s-full before:-z-10 after:-z-10 after:rounded-e-full after:duration-300 after:hover:translate-x-0 after:block after:absolute after:-translate-x-full after:inset-0 after:bg-[#2d4739] relative inline-block hover:text-white z-50">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;