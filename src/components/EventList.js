import React, { useState, useEffect, useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import useStyles from "./EventListStyles.js";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import TypeSentence from "./TypedSentence";
import { Alert } from "components/Alert";
import { AlertContext } from "components/context/alert/alertContext";
import PropTypes from "prop-types";
import Theatre from "./img/theatre.png";
import Golden from "./img/golden-ticket.png";

export default function EventList({ eventData }) {
    console.log("EventList -> eventData", eventData);
    const [modalOpen, setModalOpen] = useState(false);
    const [EventData, setEventData] = useState({});
    const [select, setSelect] = useState("");
    const [EventsList, setEventsList] = useState("");

    const { show, hide } = useContext(AlertContext);
    const classes = useStyles();

    const selectEvent = e => setSelect(e.target.value);

    const clearSearch = () => {
        setSelect("");
    };

    useEffect(() => {
        const filtered = eventData.filter(
            event =>
                event.title.toLowerCase().search(select.toLowerCase()) !== -1
        );
        filtered.length !== 0
            ? setEventsList(filtered)
            : setEventsList(eventData);
        !select && hide();
        select && EventList === EventData && show(" No match found", "success");
    }, [select, eventData]);

    const userId = sessionStorage.getItem("userId");

    return (
        <Fragment>
            
            <div className={classes.heroContent}>
                <Container maxWidth="sm">
                    <Typography
                        component="h1"
                        variant="h2"
                        align="center"
                        color="textPrimary"
                        gutterBottom
                        className={classes.gutterBottom}
                    >
                        <img
                            src={Golden}
                            alt="site logo"
                            height={100}
                            margin="1em"
                        />
                        <img src={Theatre} alt="site logo" height={70} />
                    </Typography>
                    <TypeSentence />
                    <Alert />
                    <form className="form-inline my-2 my-lg-0">
                        <input
                            id="searchEvents"
                            value={select}
                            className="form-control mr-2 mx-sm-auto"
                            onChange={selectEvent}
                            type="search"
                            placeholder="Search for an Event"
                            aria-label="Search"
                            style={{ minWidth: "125px", width: "85%" }}
                        />
                        <button
                            className="btn btn-outline-primary my-2 my-sm-0"
                            type="button"
                            onClick={clearSearch}
                        >
                            Clear
                        </button>
                    </form>
                </Container>
                {!userId && (
                    <div className={classes.loginRequest}>
                        Please login or signup to buy an event ticket
                    </div>
                )}
            </div>
            <Divider variant="middle" />
            <Container className={classes.cardGrid} maxWidth="md">
                <Grid container spacing={4}>
                    {[...EventsList].map(event => (
                        <Grid item key={event.event_id} xs={12} sm={6} md={4}>
                            <Link
                                to={{
                                    pathname: `/events/${event.event_id}`,
                                    state: event
                                }}
                            >
                                <Card className={classes.card}>
                                    <CardContent
                                        className={classes.cardContent}
                                    >
                                        <Typography
                                            gutterBottom
                                            variant="h5"
                                            // component="body"
                                        >
                                            {event.title}
                                        </Typography>
                                        <Typography
                                            gutterBottom
                                            variant="body"
                                            // component="body"
                                        >
                                            {event.event_description}
                                        </Typography>
                                        <Typography
                                            gutterBottom
                                            variant="body"
                                            // component="body"
                                        >
                                            Event Fee: {event.fee}
                                        </Typography>
                                    </CardContent>
                                    <CardMedia
                                        className={classes.cardMedia}
                                        // image = {mechanic.avatar}
                                        title="Image title"
                                    />
                                </Card>
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Fragment>
    );
}

EventList.propTypes = {
    eventData: PropTypes.array.isRequired
};
