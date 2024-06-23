import { mdiTwitch } from "@mdi/js";
import Icon from "@mdi/react";

const logo = new URL("../../assets/favicon.png", import.meta.url);

const barcodeData =
  'url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTIiIGhlaWdodD0iNDc3IiB2aWV3Qm94PSIwIDAgOTIgNDc3IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNMS4wMDA1OCA0NTkuOTk4VjQ2Mi45OThIOTEuMDAwNEw5MS4wMDA2IDQ1OS45OThIMS4wMDA1OFoiIGZpbGw9IiMyNjI2MjYiLz4KPHBhdGggZD0iTTEuMDAwMzEgNDMzLjk5OFY0MzYuOTk4SDkxLjAwMDJMOTEuMDAwMyA0MzMuOTk4SDEuMDAwMzFaIiBmaWxsPSIjMjYyNjI2Ii8+CjxwYXRoIGQ9Ik0xLjAwMDE1IDQyOC45OThWNDMxLjk5OEg5MUw5MS4wMDAyIDQyOC45OThIMS4wMDAxNVoiIGZpbGw9IiMyNjI2MjYiLz4KPHBhdGggZD0iTTEuMDAwNyA0MjEuOTk4VjQyNC45OThIOTEuMDAwNUw5MS4wMDA3IDQyMS45OThIMS4wMDA3WiIgZmlsbD0iIzI2MjYyNiIvPgo8cGF0aCBkPSJNMSA0MDcuOTk4VjQxMC45OThIOTAuOTk5OEw5MSA0MDcuOTk4SDFaIiBmaWxsPSIjMjYyNjI2Ii8+CjxwYXRoIGQ9Ik0wLjk5OTgxNyAzOTUuOTk4VjM5OC45OThIOTAuOTk5N0w5MC45OTk4IDM5NS45OThIMC45OTk4MTdaIiBmaWxsPSIjMjYyNjI2Ii8+CjxwYXRoIGQ9Ik0wLjk5OTg0NyAzODEuNDk4VjM4NC40OThIOTAuOTk5N0w5MC45OTk4IDM4MS40OThIMC45OTk4NDdaIiBmaWxsPSIjMjYyNjI2Ii8+CjxwYXRoIGQ9Ik0wLjk5OTY2NCAzNjcuOTk4VjM3MS45OThIOTAuOTk5NUw5MC45OTk3IDM2Ny45OThIMC45OTk2NjRaIiBmaWxsPSIjMjYyNjI2Ii8+CjxwYXRoIGQ9Ik0wLjk5OTYzNCAzNTQuOTk4VjM1Ny45OThIOTAuOTk5NUw5MC45OTk2IDM1NC45OThIMC45OTk2MzRaIiBmaWxsPSIjMjYyNjI2Ii8+CjxwYXRoIGQ9Ik0xLjAwMDg1IDM0OC45OThWMzUwLjk5OEg5MS4wMDA3TDkxLjAwMDkgMzQ4Ljk5OEgxLjAwMDg1WiIgZmlsbD0iIzI2MjYyNiIvPgo8cGF0aCBkPSJNMS4wMDEwMSAzNDMuOTk4VjM0NS45OThIOTEuMDAwOUw5MS4wMDEgMzQzLjk5OEgxLjAwMTAxWiIgZmlsbD0iIzI2MjYyNiIvPgo8cGF0aCBkPSJNMS4wMDExNiAzMjEuOTk4VjMyNC45OThIOTEuMDAxTDkxLjAwMTIgMzIxLjk5OEgxLjAwMTE2WiIgZmlsbD0iIzI2MjYyNiIvPgo8cGF0aCBkPSJNMS4wMDEzMSAzMTYuOTk4VjMxOS45OThIOTEuMDAxMkw5MS4wMDEzIDMxNi45OThIMS4wMDEzMVoiIGZpbGw9IiMyNjI2MjYiLz4KPHBhdGggZD0iTTEuMDAxNDYgMjk4Ljk5OFYzMDAuOTk4SDkxLjAwMTNMOTEuMDAxNSAyOTguOTk4SDEuMDAxNDZaIiBmaWxsPSIjMjYyNjI2Ii8+CjxwYXRoIGQ9Ik0xLjAwMTYyIDI5MS45OThWMjkzLjk5OEg5MS4wMDE1TDkxLjAwMTYgMjkxLjk5OEgxLjAwMTYyWiIgZmlsbD0iIzI2MjYyNiIvPgo8cGF0aCBkPSJNMC45OTk3MjUgMjc4Ljk5OFYyODEuOTk4SDkwLjk5OTZMOTAuOTk5NyAyNzguOTk4SDAuOTk5NzI1WiIgZmlsbD0iIzI2MjYyNiIvPgo8cGF0aCBkPSJNMC45OTk2NjQgMjY1LjE5OEwwLjk5OTcyNSAyNjYuOTk4SDkwLjk5OTZMOTAuOTk5NyAyNjUuMTk4SDAuOTk5NjY0WiIgZmlsbD0iIzI2MjYyNiIvPgo8cGF0aCBkPSJNMC45OTk0ODEgMjU1Ljk5OEwwLjk5OTg0NyAyNTkuOTk4SDkwLjk5OTdMOTAuOTk5NSAyNTUuOTk4SDAuOTk5NDgxWiIgZmlsbD0iIzI2MjYyNiIvPgo8cGF0aCBkPSJNMC45OTk3MjUgMjQzLjQ5OFYyNDYuNDk4SDkwLjk5OTZMOTAuOTk5NyAyNDMuNDk4SDAuOTk5NzI1WiIgZmlsbD0iIzI2MjYyNiIvPgo8cGF0aCBkPSJNMC45OTk0ODEgMjM4LjQ5OFYyNDEuNDk4SDkwLjk5OTNMOTAuOTk5NSAyMzguNDk4SDAuOTk5NDgxWiIgZmlsbD0iIzI2MjYyNiIvPgo8cGF0aCBkPSJNMC45OTkzMjkgMjMxLjQ5OFYyMzQuNDk4SDkwLjk5OTJMOTAuOTk5MyAyMzEuNDk4SDAuOTk5MzI5WiIgZmlsbD0iIzI2MjYyNiIvPgo8cGF0aCBkPSJNMC45OTkxNzYgMjI0Ljk5OFYyMjkuNDk4SDkwLjk5OUw5MC45OTkyIDIyNC45OThIMC45OTkxNzZaIiBmaWxsPSIjMjYyNjI2Ii8+CjxwYXRoIGQ9Ik0wLjk5OTA1NCAyMTIuNDk4VjIxNS40OThIOTAuOTk4OUw5MC45OTkxIDIxMi40OThIMC45OTkwNTRaIiBmaWxsPSIjMjYyNjI2Ii8+CjxwYXRoIGQ9Ik0xLjAwMDY3IDIwNS40OThWMjA4LjQ5OEg5MS4wMDA1TDkxLjAwMDcgMjA1LjQ5OEgxLjAwMDY3WiIgZmlsbD0iIzI2MjYyNiIvPgo8cGF0aCBkPSJNMS4wMDA4MiAxODUuOTk4VjE4OC45OThIOTEuMDAwN0w5MS4wMDA4IDE4NS45OThIMS4wMDA4MloiIGZpbGw9IiMyNjI2MjYiLz4KPHBhdGggZD0iTTAuOTk4OTAxIDE2Ni45OThWMTY5Ljk5OEg5MC45OTg3TDkwLjk5ODkgMTY2Ljk5OEgwLjk5ODkwMVoiIGZpbGw9IiMyNjI2MjYiLz4KPHBhdGggZD0iTTAuOTk4Njg4IDE2MC45OThWMTYyLjk5OEg5MC45OTg1TDkwLjk5ODcgMTYwLjk5OEgwLjk5ODY4OFoiIGZpbGw9IiMyNjI2MjYiLz4KPHBhdGggZD0iTTEuMDAxMDEgMTQxLjk5OFYxNDMuOTk4SDkxLjAwMDlMOTEuMDAxIDE0MS45OThIMS4wMDEwMVoiIGZpbGw9IiMyNjI2MjYiLz4KPHBhdGggZD0iTTEuMDAxMTkgMTA3Ljk5OFYxMTAuOTk4SDkxLjAwMUw5MS4wMDEyIDEwNy45OThIMS4wMDExOVoiIGZpbGw9IiMyNjI2MjYiLz4KPHBhdGggZD0iTTAuOTk4NTM1IDc5Ljk5NzlMMS4wMDEzNCA4NC40OTc5SDkxLjAwMTJMOTAuOTk4NSA3OS45OTc5SDAuOTk4NTM1WiIgZmlsbD0iIzI2MjYyNiIvPgo8cGF0aCBkPSJNMS4wMDE0MyA2Mi40OTc5VjY1LjQ5NzlIOTEuMDAxM0w5MS4wMDE0IDYyLjQ5NzlIMS4wMDE0M1oiIGZpbGw9IiMyNjI2MjYiLz4KPHBhdGggZD0iTTEuMDAxODMgNy45OTc5MlYxMC45OTc5SDkxLjAwMTdMOTEuMDAxOCA3Ljk5NzkySDEuMDAxODNaIiBmaWxsPSIjMjYyNjI2Ii8+CjxwYXRoIGQ9Ik00Ni4wMDA0IDQ3Ni45OThIOTEuMDAwNFY0NzQuNDk4VjQ3MS45OThINDYuMDAwNEgxLjAwMDQzVjQ3NC40OThWNDc2Ljk5OEg0Ni4wMDA0WiIgZmlsbD0iIzI2MjYyNiIvPgo8cGF0aCBkPSJNMS4wMDA0MyA0NjkuOTk4VjQ2Ni45OThIOTEuMDAwNEw5MS4wMDAzIDQ2OS45OThIMS4wMDA0M1oiIGZpbGw9IiMyNjI2MjYiLz4KPHBhdGggZD0iTTQ2LjAwMDQgNDUwLjk5OEg5MS4wMDA0VjQ0NS45OThWNDQwLjk5OEg0Ni4wMDA0SDEuMDAwNDNWNDQ1Ljk5OFY0NTAuOTk4SDQ2LjAwMDRaIiBmaWxsPSIjMjYyNjI2Ii8+CjxwYXRoIGQ9Ik00Ni4wMDA0IDQxOS45OThIOTEuMDAwNFY0MTcuNDk4VjQxNC45OThINDYuMDAwNEgxLjAwMDQzVjQxNy40OThWNDE5Ljk5OEg0Ni4wMDA0WiIgZmlsbD0iIzI2MjYyNiIvPgo8cGF0aCBkPSJNNDYuMDAwNCAzOTMuOTk4SDkxLjAwMDRWMzkxLjQ5OFYzODguOTk4SDQ2LjAwMDRIMS4wMDA0M1YzOTEuNDk4VjM5My45OThINDYuMDAwNFoiIGZpbGw9IiMyNjI2MjYiLz4KPHBhdGggZD0iTTQ2LjAwMDQgMzM2Ljk5OEg5MS4wMDA0VjMzMS45OThWMzI2Ljk5OEg0Ni4wMDA0SDEuMDAwNDNWMzMxLjk5OFYzMzYuOTk4SDQ2LjAwMDRaIiBmaWxsPSIjMjYyNjI2Ii8+CjxwYXRoIGQ9Ik00Ni4wMDA0IDMxNC45OThIOTEuMDAwNFYzMTIuNDk4VjMwOS45OThINDYuMDAwNEgxLjAwMDQzVjMxMi40OThWMzE0Ljk5OEg0Ni4wMDA0WiIgZmlsbD0iIzI2MjYyNiIvPgo8cGF0aCBkPSJNNDYuMDAwNCAyNzYuOTk4SDkxLjAwMDRWMjc0LjQ5OFYyNzEuOTk4SDQ2LjAwMDRIMS4wMDA0M1YyNzQuNDk4VjI3Ni45OThINDYuMDAwNFoiIGZpbGw9IiMyNjI2MjYiLz4KPHBhdGggZD0iTTQ2LjAwMDQgMjAwLjk5OEg5MS4wMDA0VjE5NS45OThWMTkwLjk5OEg0Ni4wMDA0SDEuMDAwNDNWMTk1Ljk5OFYyMDAuOTk4SDQ2LjAwMDRaIiBmaWxsPSIjMjYyNjI2Ii8+CjxwYXRoIGQ9Ik00Ni4wMDA0IDE3Ni45OThIOTEuMDAwNFYxNzQuNDk4VjE3MS45OThINDYuMDAwNEgxLjAwMDQzVjE3NC40OThWMTc2Ljk5OEg0Ni4wMDA0WiIgZmlsbD0iIzI2MjYyNiIvPgo8cGF0aCBkPSJNNDYuMDAwNCAxNTUuOTk4SDkxLjAwMDRWMTUwLjk5OFYxNDUuOTk4SDQ2LjAwMDRIMS4wMDA0M1YxNTAuOTk4VjE1NS45OThINDYuMDAwNFoiIGZpbGw9IiMyNjI2MjYiLz4KPHBhdGggZD0iTTQ2LjAwMDQgMTM2Ljk5OEg5MS4wMDA0VjEzNC40OThWMTMxLjk5OEg0Ni4wMDA0SDEuMDAwNDNWMTM0LjQ5OFYxMzYuOTk4SDQ2LjAwMDRaIiBmaWxsPSIjMjYyNjI2Ii8+CjxwYXRoIGQ9Ik00Ni4wMDA0IDEyOS45OThIOTEuMDAwNFYxMjcuNDk4VjEyNC45OThINDYuMDAwNEgxLjAwMDQzVjEyNy40OThWMTI5Ljk5OEg0Ni4wMDA0WiIgZmlsbD0iIzI2MjYyNiIvPgo8cGF0aCBkPSJNNDYuMDAwNCAxMjEuOTk4SDkxLjAwMDRWMTE3LjQ5OFYxMTIuOTk4SDQ2LjAwMDRIMS4wMDA0M1YxMTcuNDk4VjEyMS45OThINDYuMDAwNFoiIGZpbGw9IiMyNjI2MjYiLz4KPHBhdGggZD0iTTQ2LjAwMDQgMTA1Ljk5OEg5MS4wMDA0VjEwMi40OThWOTguOTk3OUg0Ni4wMDA0SDEuMDAwNDNWMTAyLjQ5OFYxMDUuOTk4SDQ2LjAwMDRaIiBmaWxsPSIjMjYyNjI2Ii8+CjxwYXRoIGQ9Ik00Ni4wMDA0IDk1Ljk5NzlIOTEuMDAwNFY5MS40OTc5Vjg2Ljk5NzlINDYuMDAwNEgxLjAwMDQzVjkxLjQ5NzlWOTUuOTk3OUg0Ni4wMDA0WiIgZmlsbD0iIzI2MjYyNiIvPgo8cGF0aCBkPSJNNDYuMDAwNCA3NC45OTc5SDkxLjAwMDRWNzEuNDk3OVY2Ny45OTc5SDQ2LjAwMDRIMS4wMDA0M1Y3MS40OTc5Vjc0Ljk5NzlINDYuMDAwNFoiIGZpbGw9IiMyNjI2MjYiLz4KPHBhdGggZD0iTTQ2LjAwMDQgNTcuOTk3OUg5MS4wMDA0VjU1LjQ5NzlWNTIuOTk3OUg0Ni4wMDA0SDEuMDAwNDNWNTUuNDk3OVY1Ny45OTc5SDQ2LjAwMDRaIiBmaWxsPSIjMjYyNjI2Ii8+CjxwYXRoIGQ9Ik00Ni4wMDA0IDUwLjk5NzlIOTEuMDAwNFY0OC40OTc5VjQ1Ljk5NzlINDYuMDAwNEgxLjAwMDQzVjQ4LjQ5NzlWNTAuOTk3OUg0Ni4wMDA0WiIgZmlsbD0iIzI2MjYyNiIvPgo8cGF0aCBkPSJNNDYuMDAwNCA0My45OTc5SDkxLjAwMDRWNDEuNDk3OVYzOC45OTc5SDQ2LjAwMDRIMS4wMDA0M1Y0MS40OTc5VjQzLjk5NzlINDYuMDAwNFoiIGZpbGw9IiMyNjI2MjYiLz4KPHBhdGggZD0iTTQ2LjAwMDQgMzEuOTk3OUg5MS4wMDA0VjI5LjQ5NzlWMjYuOTk3OUg0Ni4wMDA0SDEuMDAwNDNWMjkuNDk3OVYzMS45OTc5SDQ2LjAwMDRaIiBmaWxsPSIjMjYyNjI2Ii8+CjxwYXRoIGQ9Ik00Ni4wMDA0IDE5Ljk5NzlIOTEuMDAwNFYxNi40OTc5VjEyLjk5NzlINDYuMDAwNEgxLjAwMDQzVjE2LjQ5NzlWMTkuOTk3OUg0Ni4wMDA0WiIgZmlsbD0iIzI2MjYyNiIvPgo8cGF0aCBkPSJNNDYuMDAwNCA1Ljk5NzkySDkxLjAwMDRWMy40OTc5MlYwLjk5NzkyNUg0Ni4wMDA0SDEuMDAwNDNWMy40OTc5MlY1Ljk5NzkySDQ2LjAwMDRaIiBmaWxsPSIjMjYyNjI2Ii8+Cjwvc3ZnPgo=")';

export const Ticket = () => {
  return (
    <section className="flex justify-center pt-5 select-none">
      <div className="flex m-5 max-w-lg -rotate-2 transform-gpu w-full">
        <div className="backdrop-blur-md bg-gradient-to-br from-lavender-200 to-arctic-200 bg-opacity-10 px-3 py-2 relative rounded-lg shadow w-full">
          <div className="flex justify-between mb-10">
            <span className="font-brush text-2xl">Week of Charity</span>
            <img className="h-8 rotate-12" src={logo.toString()} />
          </div>

          <div className="flex items-end justify-between">
            <Icon className="mr-auto" path={mdiTwitch} size="2rem" />

            <div className="mr-6 text-right">
              <p className="font-semibold text-lavender-800 text-xs uppercase">
                Beginn
              </p>
              <p className="font-round font-bold">13:00</p>
            </div>

            <div className="text-right">
              <p className="font-semibold text-lavender-800 text-xs uppercase">
                Eventzeitraum
              </p>
              <p className="font-round font-bold">25.9. &mdash; 2.10.</p>
            </div>
          </div>

          <div className="absolute border-r-2 border-white border-dashed h-full -right-[1px] top-0" />
        </div>

        <div className="bg-white p-2 rounded-lg shadow w-12">
          <div
            className="bg-cover h-full w-full"
            style={{ backgroundImage: barcodeData }}
          ></div>
        </div>
      </div>
    </section>
  );
};
