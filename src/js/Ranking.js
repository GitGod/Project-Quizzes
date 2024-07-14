import React, {useEffect, useState} from 'react';
import {fetchResp} from "./Api/utils";

const Ranking = () => {
    const [rankings, setRanking] = useState(null);
    const [quizName, setQuizName] = useState("Flagi");
    const [quizLevel, setQuizLevel] = useState("easy");
    const [button1Color, setButton1Color] = useState('red');
    const [button2Color, setButton2Color] = useState('white');

    let i = 0;

    useEffect(() => {
        fetch(`http://localhost:3000/rankings`)
            .then(fetchResp)
            .then(data => {
                const sortedData = sortData(data, 'points', 'timeSpent');
                const filteredData = filterData(sortedData, quizLevel, quizName).slice(0, 10);
                setRanking(filteredData)
            })
            .catch((err) => console.log(err));
    }, [quizName, quizLevel,[]]);

    function filterData(data, quizLevel, name) {
        return data.filter(ranking => ranking.name === name).filter(ranking => ranking.level === quizLevel);
    }

    function sortData(data, key, key2) {
        return data.sort((a, b) => {
            if (b[key] === a[key]) {
                if (a[key2] < b[key2]) return -1;
                if (a[key2] > b[key2]) return 1;
                return 0;
            }
            return b[key] - a[key];
        });
    }

    function changeLevel(chosenLevel) {
        if (chosenLevel === "easy") {
            setButton1Color('red');
            setButton2Color('white');
        } else {
            setButton2Color('red');
            setButton1Color('white');
        }
        setQuizLevel(chosenLevel)

    }

    const handleChange = (e) => setQuizName(e.target.value);

    return (
        <div className="ranking container">

            {rankings && (
                <table className="rankingTable">
                    <thead>
                    <tr>
                        <th>Place</th>
                        <th>Name</th>
                        <th>Score</th>
                        <th>Time</th>
                    </tr>
                    </thead>
                    <tbody>
                    {rankings.map((ranking) => (
                        <tr key={ranking.id}>
                            <td>{++i}</td>
                            <td>{ranking.playerName}</td>
                            <td>{ranking.points}</td>
                            <td>{Math.floor(ranking.timeSpent / 60)}:{('0' + (ranking.timeSpent % 60)).slice(-2)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
            <div className="rankingFields">
                <select className="rankingSelect" onChange={handleChange}>
                    <option value="Flagi">Flagi</option>
                    <option value="Flagi Europa">Flagi Europa</option>
                </select>
                <div className="rankingButtons">
                    <button className="easyButtonRanking" style={{backgroundColor: button1Color}}
                            onClick={() => changeLevel("easy")}>Łatwy
                    </button>
                    <button className="hardButtonRanking" style={{backgroundColor: button2Color}}
                            onClick={() => changeLevel("hard")}>Trudny
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Ranking;