import React from 'react'
import { battle } from '../utils/api'

export default class Results extends React.Component {
    constructor(propr) {
        super(props)

        this.state = {
            winner: null,
            loser: null,
            error: null,
            loading: true
        }
    }
    componentDidMount () {
        const { playerOne, playerTwo } = this.props

        battle([ playerOne,playerTwo ])
        .then((players) => {
            this.setState({
                winner:player[0],
                loser: player[1],
                error: null,
                loading: false
            })
        }).catch(({ message }) => {
            this.setState({
                error: message,
                loading: false
            })
        })
    }
    render() {
        const {winner, loser, error, loading } = this.state

        if (loading === true) {
            return <p>LOADING</p>
        }

        if (error) {
            return (
                <p className= 'center-text error'>{error}</p>
            )
        }
        return (
            <div className ='grid space -around container-sm'>
            Results
            <pre>{JSON.stringify(this.state, null, 2)}</pre>
            </div>
        )
    }
}