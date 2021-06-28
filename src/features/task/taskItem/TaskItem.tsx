import React from "react";
import styles from "./TaskItem.module.scss";
import Checkbox from "@material-ui/core/Checkbox";
import EventNoteIcon from "@material-ui/icons/EventNote";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Modal from "@material-ui/core/Modal";
import TaskForm from "../taskForm/TaskForm";
import { useDispatch, useSelector } from "react-redux";
import { handleModalOpen, selectIsModalOpen, selectTask } from "../taskSlice";

interface PropTypes {
  task: { id: number; title: string; completed: boolean };
}
const taskItem: React.FC<PropTypes> = ({ task }) => {
  const isModalOpen = useSelector(selectIsModalOpen);
  const dispatch = useDispatch();

  const handleOpen = () => {
    dispatch(selectTask(task));
    dispatch(handleModalOpen(true));
  };

  const handleClose = () => {
    dispatch(handleModalOpen(false));
  };
  return (
    <div className={styles.root}>
      <div className={styles.title}>
        <EventNoteIcon />
        <div className={styles.title_text}>{task.title}</div>
      </div>
      <div className={styles.right_item}>
        <Checkbox
          checked={task.completed}
          onClick={() => console.log(`check ${task.id}`)}
          className={styles.checkbox}
        />
        <button className={styles.edit_button} onClick={handleOpen}>
          <EditIcon className={styles.icon} />
        </button>
        <button
          className={styles.delete_button}
          onClick={() => console.log(`delete ${task.id}`)}
        >
          <DeleteIcon className={styles.icon} />
        </button>
      </div>

      <Modal open={isModalOpen} onClose={handleClose} className={styles.modal}>
        <div className={styles.modal_content}>
          <div className={styles.modal_title}>Edit</div>
          <TaskForm edit />
        </div>
      </Modal>
    </div>
  );
};

export default taskItem;
