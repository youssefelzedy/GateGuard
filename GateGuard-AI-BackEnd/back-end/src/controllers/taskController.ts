// import { Request, Response } from 'express';
// import { Task, ITask } from '../models/taskModel';

// const taskController = {
//   getAllTasks: async (req: Request, res: Response): Promise<void> => {
//     try {
//       const tasks: ITask[] = await Task.find();
//       res.status(200).json({ tasks });
//     } catch (error) {
//       res.status(500).json({ error });
//     }
//   },

//   getTask: async (req: Request, res: Response): Promise<void> => {
//     try {
//       const task: ITask | null = await Task.findById(req.params.id);
//       res.status(200).json({ task });
//     } catch (error) {
//       res.status(500).json({ error });
//     }
//   },

//   createTask: async (req: Request, res: Response): Promise<void> => {
//     try {
//       const task: ITask = await Task.create(req.body);
//       res.status(201).json({ task });
//     } catch (error) {
//       res.status(500).json({ error });
//     }
//   },

//   updateTask: async (req: Request, res: Response): Promise<void> => {
//     try {
//       const task: ITask | null = await Task.findByIdAndUpdate(
//         req.params.id,
//         req.body,
//         {
//           new: true,
//         },
//       );
//       res.status(200).json({ task });
//     } catch (error) {
//       res.status(500).json({ error });
//     }
//   },

//   deleteTask: async (req: Request, res: Response): Promise<void> => {
//     try {
//       const task: ITask | null = await Task.findByIdAndDelete(req.params.id);
//       res.status(204).send();
//     } catch (error) {
//       res.status(500).json({ error });
//     }
//   },
// };

// export default taskController;
