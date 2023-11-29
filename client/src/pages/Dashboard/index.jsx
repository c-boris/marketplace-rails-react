import DashboardForm from "../../components/DashboardForm/";
import NewProperty from "../../components/NewProperty/NewProperty";
import PasswordUpdateForm from "../../components/PasswordUpdateForm/";
const Dashboard = () => {
  return (
    <>
      <DashboardForm />
      <PasswordUpdateForm />
      <NewProperty />
    </>
  );
};
export default Dashboard;
