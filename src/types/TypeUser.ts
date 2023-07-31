import Task from './TypeTask';

type TUser = {
    email: string;
    password: string;
    tasks: Task[];
};

export default TUser;
