import * as React from 'react'
import { Box, Grid, GridProps, Heading, ResponsiveContext } from 'grommet'
import MainHeader from '../components/main-header'
import { SubHeader } from '../components/simple-divs'
import OrdersPlacedList from '../components/orders-placed-list'
import PortfolioList from '../components/portfolio-list'

/*******************************************************************************
 *
 * PortfolioView
 *
 ******************************************************************************/

/**
 * PortfolioView Component
 */
const PortfolioView = () => {
    const size = React.useContext( ResponsiveContext )

    return (
        <>
            <MainHeader />
            <SubHeader addlProps={{ pad: { horizontal: "small" } }}>
                <Heading>Portfolio</Heading>
                <Grid
                    {...getGridProps( size )}
                    fill
                    gap="small"
                    justifyContent="center"
                    margin={{ bottom: "medium" }}
                    style={{ height: "auto", maxWidth: "1200px" }}
                >
                    <Box gridArea="portfolio">
                        <PortfolioList />
                    </Box>
                    <Box gridArea="orders-placed">
                        <OrdersPlacedList />
                    </Box>
                </Grid>
            </SubHeader>
        </>
    )
}

/*******************************************************************************
 *
 * Utils
 *
 ******************************************************************************/

 const getGridProps = ( size: string ): GridProps => {
    if( size === "small" ) {
        return {
            areas: [
                [ "portfolio" ],
                [ "orders-placed" ]
            ],
            columns: "100%",
            rows: [ "medium", "medium" ]
        }
    }
    else {
        return {
            areas: [
                [ "portfolio", "orders-placed" ]
            ],
            columns: [ "flex", "medium" ],
            rows: [ "650px" ]
        }
    }
}

export default PortfolioView
