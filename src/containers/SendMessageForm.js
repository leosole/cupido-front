import Button from '@material-ui/core/Button';
import Input from "@material-ui/core/Input";

import { useForm } from "react-hook-form";

function ViewMessagesForm() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label> Nome</label>
      <Input placeholder="Nome do crush" {...register("name", { required: true })} />
      <label> E-mail</label>
      <Input type="email" placeholder="E-mail do crush"{...register("email", { required: true })} />
      <label> Mensagem</label>
      <Input placeholder="Mensagem"{...register("message", { required: true })} />
      {errors.exampleRequired && <span>Esqueceu desse campo!</span>}
      <Button type="submit">
        Enviar
      </Button>
    </form>
  );
}

export default ViewMessagesForm;
