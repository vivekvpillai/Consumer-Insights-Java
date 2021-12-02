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
            }
        )
    }

    createobject = (event) => {
        event.preventDefault();
        axios.post(
            '/objects',
            {
                samplename:this.state.newobjectsamplename,
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

    changeNewobjectsamplename = (event) => {
        this.setState({
            newobjectsamplename:event.target.value
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
                samplename:this.state.updateObjectsamplename,
                category:this.state.updateObjectcategory,
                visits:this.state.updateObjectvisits
            }
        ).then(
            (response) => {
                this.setState({
                    objects:response.data,
                    samplename:'',
                    category:null,
                })
            }
        )
    }

    changeupdateObjectsamplename = (event) => {
        this.setState(
            {
                updateObjectsamplename:event.target.value
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
                <input onKeyUp={this.changeNewobjectsamplename} type="text" placeholder="samplename" /><br/>
                <input onKeyUp={this.changeNewobjectcategory} type="text" placeholder="category" /><br/>
                <input onKeyUp={this.changeNewobjectvisits} type="number" placeholder="visits" /><br/>
                <input type="submit" value="Create object" />
            </form>
            <h2>List of objects</h2>
            <ul>
                {
                    this.state.objects.map(
                        (object, index) => {
                            return <li key={index}>

                                {object.samplename}: {object.category} : {object.visits}

                                <button value={object.id} onClick={this.deleteObject}>DELETE</button>

                                <form id={object.id} onSubmit={this.updateObject}>
                                    <input onKeyUp={this.changeupdateObjectsamplename} type="text" placeholder="samplename"/><br/>
                                    <input onKeyUp={this.changeupdateObjectcategory} type="number" placeholder="category"/><br/>
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
