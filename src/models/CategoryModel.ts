import { Milestone } from "../services/github";

export default class CategoryModel {
  private constructor(
    public id: number,
    public number: number,
    public title: string,
    public description: string,
    public articles: number
  ) {}

  static from(raw: Milestone): CategoryModel {
    return new CategoryModel(
      // 新的category model实例会将下列raw的各个属性值赋给constructor属性

      raw.id,
      raw.number,
      raw.title,
      raw.description,
      raw.open_issues//赋给articles属性
    );
  }
}
