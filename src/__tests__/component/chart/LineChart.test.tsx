import React from "react";
import { create } from "react-test-renderer";
import {LineChart} from "../../../component/chart/LineChart";

describe("LineChart component", () => {
    test("Matches the snapshot", () => {
        const mockData = [{
            x: new Date(),
            y: 10
        }]
        const lineChart = create(<LineChart data={mockData} />);
        expect(lineChart.toJSON()).toMatchSnapshot();
    });
});
