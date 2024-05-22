const PopUp = ({  handleDeleteUser, id ,ShowPopUpHandler,showPopUp,text}) => { 
    return <div className={`${showPopUp ? "fixed" : "hidden"} popup w-full  h-full bg-[rgba(0,0,0,.5)] top-0 left-0 z-50 flex justify-center items-center`}>
        <div className="box bg-white w-[90%] md:w-[40%] h-[30%] flex flex-col justify-between p-2 rounded-md">
            <h2 className="m-auto mt-4 w-[70px] h-[70px] leading-[70px] rounded-full text-black  bg-slate-300 text-center text-4xl">!</h2>
            <p className="text-black text-center mb-4">{text}</p>
            <div className="flex justify-around gap-2">
                <button className="bg-green-500 text-white py-2 w-full" onClick={() => handleDeleteUser(id)}>OK</button>
                <button className="bg-red-700 text-white py-2 w-full" onClick={ShowPopUpHandler}>Cancel</button>
            </div>
        </div>
    </div>
}
export default PopUp