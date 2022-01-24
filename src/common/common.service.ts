export interface Service {
  create: (resource: any) => Promise<any>;
  list: (limit: number, page: number) => Promise<any>;
  findById: (id: string) => Promise<any>;
  deleteById: (id: string, otherId?: string) => Promise<any>;
}
