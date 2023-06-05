import { useState } from "react"
import Image from "next/image";
import Head from "next/head";

export function Square({value, onSquareClick}){

  return (
    <button onClick = {onSquareClick}className={`text-2xl rounded h-[6rem] md:h-[8rem] lg:h-[10rem]  bg-white text-black text-bold border-2 border-white ${value == "X"?"text-rose-500":"text-sky-500"}`}>{value}</button>
  )
}

export default function Game(){
  
  const [history,setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const value = history[currentMove];
  const xIsNext = currentMove % 2 === 0

  function handlePlay(nextSquares){
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove){
    setCurrentMove(nextMove);
  }

  //Second parameter of map gives the index number
  const moveHistory = history.map((square, move)=>{

    let jumpDescription;

    move>0 ? jumpDescription = "Go To move number " + move : jumpDescription = "Go to Game start";

    return (
      <>
      <button className = " flex items-center justify-start gap-2 border-2 border-white py-1 pl-3 hover:bg-white hover:text-black transition-all duration-300" key = {move} onClick={()=>jumpTo(move)}>
        <Image src="/images/back.svg" width={24} height={24} alt="go back" /> 
        {jumpDescription}
      </button>
      </>
    )
  })

  return(
    <div className="flex flex-col gap-5 max-w-xs md:max-w-md lg:max-w-lg mx-auto">
    <Board xIsNext={xIsNext} value={value} onPlay={handlePlay}/>
    {moveHistory}
    </div>
  )
}

export function Board({xIsNext, value, onPlay}) {

  function handleClick(i){
    
    if(value[i] || calculateWinner(value)) return ;
    
    const squareArr = value.slice();
    xIsNext ? squareArr[i] = "X" : squareArr[i] = "O"

    onPlay(squareArr);
  }

  const winner = calculateWinner(value);

  return (
    <div className="flex flex-col gap-5 my-5">
      <Head>
        <link rel="icon" href="/images/logo.svg" type="image/icon type"/>
        <title>Kingin Tic Tac Toe</title>
      </Head>
    <div className="flex gap-3 items-center justify-center"><Image src = "/images/logo.svg" width={32} height={32} alt="Tic tac toe Logo"/><h1 className=" text-center text-2xl py-1">Wecome to Tic Tac Toe.</h1></div>

    {winner ? 
    <span className="flex items-center justify-center gap-2 border-2 text-center text-2xl py-1"><span>Winner: </span><span className= {`${!xIsNext ?"text-rose-500":"text-sky-500"}`}>{winner}</span></span> 
    : 
    <span className="flex items-center justify-center gap-2 border-2 text-center text-2xl py-1"><span>Next player: </span><span className= {`${xIsNext ?"text-rose-500":"text-sky-500"}`}>{xIsNext ? "X" : "O"}</span></span>
    }

    <div className="grid grid-cols-3  gap-1 drop-shadow-[10px_15px_15px_rgba(135,206,235,0.50)]">
      <Square onSquareClick = {()=>handleClick(0)} value = {value[0]}/>
      <Square onSquareClick = {()=>handleClick(1)} value = {value[1]}/>
      <Square onSquareClick = {()=>handleClick(2)} value = {value[2]}/>
      <Square onSquareClick = {()=>handleClick(3)} value = {value[3]}/>
      <Square onSquareClick = {()=>handleClick(4)} value = {value[4]}/>
      <Square onSquareClick = {()=>handleClick(5)} value = {value[5]}/>
      <Square onSquareClick = {()=>handleClick(6)} value = {value[6]}/>
      <Square onSquareClick = {()=>handleClick(7)} value = {value[7]}/>
      <Square onSquareClick = {()=>handleClick(8)} value = {value[8]}/>
    </div>
      
    </div>
    
  )
}

function calculateWinner(value){
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i =0; i < lines.length; i++){
    const [a,b,c] = lines[i];
    if(value[a] && value[a]===value[b] && value[a] === value[c]){
      return value[a];
    }
  }
  return null;
}