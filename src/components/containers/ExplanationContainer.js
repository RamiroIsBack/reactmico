/*import React from "react"
import Explanation from "../presentational/Explanation"
import styles from "./styles"
import superagent from "superagent"
export default class ExplanationContainer extends React.Component {
    constructor(args) {
        super()
        this.state = {
            feria:{
                direccionFeria: "",
                fechaFeria: ""
            },
            list : []

        }
    }
    // methods
    componentDidMount(){
        console.log("hello mount")
        superagent
        .get("/api/feria")
        .query(null)
        .set("Accept","application/json")
        .end((err,response) => {
            if(err){
                alert("error: " +err)
                return
            }
            console.log(JSON.stringify(response.body))
            let results = response.body.results
            this.setState({
                list: results
            })

        })

    }
    submitExplanation(){
        //make a copy of what u wanna change, change that and
        //reset the state
        let copyList = Object.assign([],this.state.list)
        copyList.push(this.state.feria)
        this.setState({
            list: copyList
        })

    }
    handleImputData(event){
        //create a copy from d state and then u update d state
        //never mutate d state!!!
        let copyToUpdate = Object.assign({},this.state.feria)
        let value = event.target.value
        event.target.name === "direccionFeria" ?
        copyToUpdate.direccionFeria =value : copyToUpdate.fechaFeria = value

        //setState kinda refresh the render to d virtual DOM
        this.setState({
            feria : copyToUpdate
        })



    }
    render(){
        const estiloExplanationList = styles.explanation
        const explanationList =
        this.state.list.map((explanation,i)=>{
            return(
                <div key ={i}><Explanation propiedades ={explanation}/></div>
            )
        })
        return(
            <div>
                <h3>En que consite la feria exantamente :</h3>
                <div style = {estiloExplanationList.container}>
                    <div>
                        {explanationList}
                    </div>
                </div>
                <div class ="container">
                    <input onChange ={this.handleImputData.bind(this)} type="text" class="form-control" name ="direccionFeria" placeholder= "calle"></input>
                    <input onChange ={this.handleImputData.bind(this)} type="text" class="form-control" name ="fechaFeria" placeholder= "fecha"></input>
                    <button onClick = {this.submitExplanation.bind(this)} class= "btn-info">submit </button>
                </div>
            </div>
        )
    }
}*/
