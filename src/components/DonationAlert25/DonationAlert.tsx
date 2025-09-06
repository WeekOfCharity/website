import { IntermissionWindow } from "../Intermission/IntermissionWindow";
import alertWindow from "../../assets/layout25/Alert_Window.png";
import { LayoutMoneyText } from "../LayoutMoneyText/LayoutMoneyText";
import { getAlertGifFromDonationAmount } from "../../utils/widgets/donationAlertGifs";
import { getAlertChessterIconFromDonationAmount } from "../../utils/widgets/donationAlertAssets25";
import cn from "classnames";

export type DonationAlertProps = {
  name?: string | null;
  amount?: number | null;
  comment?: string | null;
  withBgBlur?: boolean;
  isEn?: boolean;
};

const getDonationCommentFontSize = (comment: string | null | undefined) => {
  if (!comment) return 22;
  if (comment.length < 40) return 21;
  if (comment.length < 80) return 19;
  if (comment.length < 120) return 17;
  return 15;
};

const getWindowTitleFromDonationAmount = (
  amount: number | null | undefined
) => {
  if (!amount || amount < 500) return "Something Happened!";
  if (amount < 1000) return "Oops, a donation occured!";
  if (amount < 2000) return "402 Payment Required!";
  if (amount < 5000) return "SYSTEM WARNING!!";
  return "WHAT'S GOING ON?!?";
};

export const DonationAlert = ({
  name,
  amount,
  comment,
  withBgBlur = false,
  isEn,
}: DonationAlertProps) => {
  const gifSrc = getAlertGifFromDonationAmount(amount);
  const windowTitle = getWindowTitleFromDonationAmount(amount);
  const chessterIcon = getAlertChessterIconFromDonationAmount(amount);
  const commentFontSize = getDonationCommentFontSize(comment);

  return (
    <>
      <img
        className="size-96 object-contain object-top -mb-6 mx-auto"
        src={gifSrc}
        alt=""
      />
      <IntermissionWindow
        className="h-[258px] w-[606px]"
        borderSrc={alertWindow}
        title={windowTitle}
      >
        <div
          className={cn(
            "flex size-full p-4 text-int-highlight-light custom-text-shadow-dark gap-4",
            {
              "bg-int-highlight-dark/40 backdrop-blur-[7px]": withBgBlur,
              "bg-int-highlight-dark/70": !withBgBlur,
            }
          )}
        >
          <img
            className="object-contain mb-4"
            src={chessterIcon}
            alt=""
            width={117}
            height={108}
          />
          <div className="flex">
            <div className="flex flex-col gap-2 my-auto">
              <div className="text-[1.5rem]">
                <span className="break-all">
                  {name || (isEn ? "Anonymous" : "Anonym")}
                </span>{" "}
                {isEn ? "donates" : "spendet"}{" "}
                {amount != null && (
                  <LayoutMoneyText
                    amount={amount / 100}
                    variant="intermission25"
                    customEuroClassName="!w-5"
                  />
                )}
              </div>
              {comment && (
                <div
                  className="leading-normal pb-3 max-w-[420px]"
                  style={{ fontSize: `${commentFontSize}px` }}
                >
                  &quot;
                  {comment.length > 170
                    ? `${comment?.slice(0, 167)}...`
                    : comment}
                  &quot;
                </div>
              )}
            </div>
          </div>
        </div>
      </IntermissionWindow>
    </>
  );
};
