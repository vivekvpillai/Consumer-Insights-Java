class App extends React.Component {
    state = {
        objects:[]
    }

    componentDidMount = () => {
        axios.get('/objects').then(
            (response) => {
                this.setState({
                    objects:response.data
                })
                console.log(this.state.objects)
            }
        )
    }

    createobject = (event) => {
        event.preventDefault();
        axios.post(
            '/objects',
            {
                sampleName:this.state.newobjectsampleName,
                category:this.state.newobjectcategory,
                visits:this.state.newobjectvisits,
            }
        ).then(
            (response) => {
                this.setState({
                    objects:response.data
                })
            }
        )
    }

    changeNewobjectvisits = (event) => {
        this.setState({
            newobjectvisits:event.target.value
        });
    }

    changeNewobjectcategory = (event) => {
        this.setState({
            newobjectcategory:event.target.value
        });
    }

    changeNewobjectsampleName = (event) => {
        this.setState({
            newobjectsampleName:event.target.value
        });
    }

    deleteObject = (event) => {
        axios.delete('/objects/' + event.target.value).then(
            (response) => {
                this.setState({
                    objects:response.data
                })
            }
        )

    }

    updateObject = (event) => {
        event.preventDefault();
        const id = event.target.getAttribute('id');
        axios.put(
            '/objects/' + id,
            {
                sampleName:this.state.updateObjectsampleName,
                category:this.state.updateObjectcategory,
                visits:this.state.updateObjectvisits
            }
        ).then(
            (response) => {
                this.setState({
                    objects:response.data,
                    sampleName:'',
                    category:'',
                    visits: null
                })
            }
        )
    }

    changeupdateObjectsampleName = (event) => {
        this.setState(
            {
                updateObjectsampleName:event.target.value
            }
        )
    }

    changeupdateObjectcategory = (event) => {
        this.setState(
            {
                updateObjectcategory:event.target.value
            }
        )
    }

    changeupdateObjectvisits = (event) => {
        this.setState(
            {
                updateObjectvisits:event.target.value
            }
        )
    }

    render = () => {
        return <div>
            <h2>Create object</h2>
            <form onSubmit={this.createobject}>
                <input onKeyUp={this.changeNewobjectsampleName} type="text" placeholder="sampleName" /><br/>
                <input onKeyUp={this.changeNewobjectcategory} type="text" placeholder="category" /><br/>
                <input onKeyUp={this.changeNewobjectvisits} type="number" placeholder="visits" /><br/>
                <input type="submit" value="Create object" />
            </form>
            <h2>List of objects</h2>
            <ul>
                {
                    this.state.objects
                    .sort(({ id: previousID }, { id: currentID }) => previousID - currentID)
                    .map(
                        (object, index) => {
                          console.log(object);
                          console.log(index)
                            return <li key={index}>

                                {object.sampleName}: {object.category} : {object.visits}

                                <button value={object.id} onClick={this.deleteObject}>DELETE</button>

                                <form id={object.id} onSubmit={this.updateObject}>
                                    <input onKeyUp={this.changeupdateObjectsampleName} type="text" placeholder="sampleName"/><br/>
                                    <input onKeyUp={this.changeupdateObjectcategory} type="text" placeholder="category"/><br/>
                                    <input onKeyUp={this.changeupdateObjectvisits} type="number" placeholder="visits" /><br/>
                                    <input type="submit"  value="Update object"/>
                                </form>
                            </li>
                        }
                    )
                }
            </ul>
        </div>
    }
}

ReactDOM.render(
    <App></App>,
    document.querySelector('main')
)
