import express from 'express';
import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { Data } from '../models/dataModel';

const dataController = {
  receiveData: expressAsyncHandler(async (req: Request, res: Response) => {
    const { value } = req.body;
    console.log('Received value:', value);

    await Data.create({ value, timestamp: new Date() });

    res.status(200).json({ success: true });
  }),

  getData: expressAsyncHandler(async (req: Request, res: Response) => {
    const data = await Data.find().sort({ timestamp: -1 }).limit(100);
    
    res.status(200).json({
      status: 'success',
      results: data.length,
      data
    });
  })
};

export default dataController;
