export const utils = {
  getDate : (timestamp)=>{
    return `${new Date(timestamp)}`.split(" ").filter((item,index)=>index<4).join(" ")
  }

}
