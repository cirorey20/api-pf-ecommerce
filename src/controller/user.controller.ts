import express, { Router, Request, Response, NextFunction } from "express";
import sequelize from "../config/sequelize";
const { Users } = sequelize.models;

export const getUsers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    console.log(req.body);
    const allData = await Users.findAll();
    return res.status(200).json(allData);
  } catch (error) {
    console.log(error);
    return res.status(500).json("internal server error");
  }
};

export const createUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { name, lastName, email, password, avatar } = req.body;
    console.log(req.body);
    const allData = await Users.create({
      name,
      lastName,
      email,
      password,
      avatar,
    });
    return res.status(200).json(allData);
  } catch (error) {
    console.log(error);
    return res.status(500).json("internal server error");
  }
};
