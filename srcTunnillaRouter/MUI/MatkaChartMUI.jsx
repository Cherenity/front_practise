import { PieChart } from '@mui/x-charts/PieChart';
import { useTheme } from '@mui/material/styles';

function MatkaChartMUI({ matkat }) {
    const theme = useTheme();

    // entries muuntaa [[1,0], [2, 1], [3, 0], [4, 1], [5, 1]]
    const data = Object.entries(matkat.reduce((acc, matka) => {
        acc[matka.arvio] = (acc[matka.arvio] || 0) + 1; // // jos acc[matka.arvio] ei ole vielä olemassa → tee se arvolla nolla ja isää siihen 1
        return acc;
    }, {})).map(([arvio, count]) => ({ label: arvio, value: count }));
    // map muuntaa [{ label: "1", value: 0 }, { label: "2", value: 1 }, { label: "3", value: 0 }, { label: "4", value: 1 }. { label: "5", value: 1 }]

    const teeProsentit = (params) => {
        const pros = params.value / matkat.length * 100;
        return pros.toFixed(0) + '%';
    };

    // Määritellään kullekin arvolle väri teemasta
    const varit = {
        1: theme.palette.error.main,
        2: theme.palette.warning.main,
        3: theme.palette.info.main,
        4: theme.palette.secondary.main,
        5: theme.palette.success.main,
    };

    // Muutetaan dataa siten, että otetaan kullekin datalle väri noista yllä olevista väriestä
    const varitData = data.map(arvio => {
        return (
            {
                value: arvio.value,
                label: arvio.label,
                color: varit[arvio.label]
            }
        )
    });

    return (
        <PieChart
            series={
                [
                    {
                        arcLabel: teeProsentit,
                        data: varitData
                    },
                ]}
            width={400}
            height={200}
            sx={{
                mt: 2,
                '& .MuiPieArcLabel-root': {
                    fill: theme.palette.primary.contrastText,
                },
            }}


        />
    )
}

export default MatkaChartMUI;