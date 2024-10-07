import { ButtonCustom } from "@/lib/ui/custom-elemets/button-custom/ButtonCustom";

export default function Logout() {
  const btnLogOut = () => {
    dispatch(logOut());
    dispatch(cartAction.cleanCart());
    router.push("/");
  };

  return (
    <ButtonCustom.SiteButton
      styleSettings={{
        type: ButtonCustom.Type.text,
        roundess: ButtonCustom.Roundness.sharp,
        color: { dark: true },
        size: ButtonCustom.Size.M,
      }}
      className={classes["profile--btn"]}
      onClick={btnLogOut}
    >
      Logout
    </ButtonCustom.SiteButton>
  );
}
