import "@app/App.scss";
import { store } from "@app/app/store";
import { TaskManager } from "@app/features/task-manager/TaskManager";
import { Provider } from "react-redux";

export const App = () => {
  return (
    <Provider store={store}>
      <TaskManager />
    </Provider>
  );
};
