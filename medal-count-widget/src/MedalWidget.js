import React, { Component } from "react";
import "./MedalWidget.css";
import {
    goldSort,
    silverSort,
    totalSort,
    bronzeSort,
    MEDAL_LIST_ENDPOINT
} from "./constants";
import Flag from "./Flag";

const fetchMedalData = () =>
    fetch(MEDAL_LIST_ENDPOINT)
        .then(res => {
            if (res.ok) {
                return res.json();
            }
        })
        .then(responseJSON => {
            return responseJSON;
        });

/**
 * Compute the total number of medals and hydrate the main data object with the result
 * @param  {Object} country_medal_info
 * @return  {Object}
 */
const aggregateMedalData = country_medal_info => {
    const { code, gold, silver, bronze } = country_medal_info;
    const total = gold + silver + bronze;
    return {
        code,
        gold,
        silver,
        bronze,
        total
    };
};

/**
 * Render markup for a country's medal information
 * @param  {Object} country_medal_info
 * @param  {Number} idx
 */
const medalRowOutput = (country_medal_info, idx) => {
    const country = country_medal_info.code;
    const { gold, silver, bronze } = country_medal_info;
    const totalMedalCount = gold + silver + bronze;
    return (
        <tr key={idx}>
            <td>{idx + 1}</td>
            <td colSpan={3}>
                <Flag country={country} />
            </td>
            <td className="padding-right-20">{country}</td>
            <td className="padding-left-10 padding-right-10">{gold}</td>
            <td className="padding-left-10 padding-right-10">{silver}</td>
            <td className="padding-left-10 padding-right-10">{bronze}</td>
            <td className="padding-left-10 padding-right-10">
                {totalMedalCount}
            </td>
        </tr>
    );
};

class MedalWidget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sortMethod: this.props.sortMethod || goldSort, //Default to sorting by gold
            medal_data: null,
            loading: true
        };
    }

    componentDidMount() {
        fetchMedalData()
            .then(results => {
                this.setState({ medal_data: results });
            })
            .catch(error => {
                console.error(error);
                this.setState({ loading: false });
            });
    }

    changeSortMethod(newSortMethod) {
        this.setState({
            sortMethod: newSortMethod
        });
    }

    render() {
        if (this.state.medal_data) {
            return (
                <div className="MedalWidget">
                    <table className="u-text-center medal-table">
                        <thead>
                            <tr>
                                <th colSpan={5} />

                                <th
                                    onClick={() =>
                                        this.changeSortMethod(goldSort)
                                    }
                                    className={`sortable ${
                                        this.state.sortMethod === goldSort
                                            ? "sortable--active"
                                            : ""
                                    }`}
                                >
                                    <span className={`medal medal--gold `} />
                                </th>
                                <th
                                    onClick={() => {
                                        this.changeSortMethod(silverSort);
                                    }}
                                    className={`sortable ${
                                        this.state.sortMethod === silverSort
                                            ? "sortable--active"
                                            : ""
                                    }`}
                                >
                                    <span className={`medal medal--silver `} />
                                </th>
                                <th
                                    onClick={() =>
                                        this.changeSortMethod(bronzeSort)
                                    }
                                    className={`sortable ${
                                        this.state.sortMethod === bronzeSort
                                            ? "sortable--active"
                                            : ""
                                    }`}
                                >
                                    <span className={`medal medal--bronze `} />
                                </th>
                                <th
                                    onClick={() =>
                                        this.changeSortMethod(totalSort)
                                    }
                                    className={`sortable ${
                                        this.state.sortMethod === totalSort
                                            ? "sortable--active"
                                            : ""
                                    }`}
                                >
                                    <span className={``}>Total</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.medal_data
                                .map(aggregateMedalData)
                                .sort(this.state.sortMethod)
                                .slice(0, 10)
                                .map(medalRowOutput)}
                        </tbody>
                    </table>
                </div>
            );
        } else {
            return this.state.loading ? (
                <div>
                    Loading <span className="loading-indicator" />
                </div>
            ) : (
                <div>Error - something went wrong</div>
            );
        }
    }
}

export default MedalWidget;
