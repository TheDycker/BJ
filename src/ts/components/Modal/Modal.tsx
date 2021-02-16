import React, { FunctionComponent } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
);

const SimpleModal: FunctionComponent<{
  onOpenRanking: any;
  changeOpenRanking: any;
}> = (props) => {
  const classes = useStyles();

  let body: any = (
    <div className="d-flex justify-content-center">
      <div className={classes.paper}>
        {props.children}
      </div>
    </div>
  );

  return (
    <div onClick={props.changeOpenRanking}>
      <Modal
        open={props.onOpenRanking}
        onClose={props.changeOpenRanking}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
};
export default SimpleModal;
