import './Tab.css'

function Tab(props) {
    const percentChangeColor = props.percentChange.includes('-') ? 'red' : 'green';

    return (
        <div className="tab-container">
            <a className='name'>#{props.rank} {props.name}</a>
            <img src={props.cryptoIcon} alt="crypto icon"></img>
            <a>{props.marketCap}</a>
            <a>{props.price}</a>
            <a style={{ color: percentChangeColor }}>{props.percentChange}</a>
            <img src={props.graphIcon} alt="graph"></img>
        </div>
    );
}

export default Tab;