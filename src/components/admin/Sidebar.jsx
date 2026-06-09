import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../services/auth/authContext";

const imgVector = "/admin/reviews.svg";
const imgGroup = "/admin/status.svg";
const imgVector1 = "/admin/orders.svg";
const imgVector2 = "/admin/logout.svg";
const imgVector4 = "/admin/edit.svg";
const imgVector5 = "/admin/dashboard.svg";

function MaterialSymbolsStarRounded({ className }) {
  return (
    <div
      className={
        className || "relative size-[40px] flex items-center justify-center"
      }
    >
      <img
        alt=""
        className="max-h-full max-w-full object-contain"
        src={imgVector}
      />
    </div>
  );
}

function MingcuteTimeFill({ className }) {
  return (
    <div
      className={
        className || "relative size-[40px] flex items-center justify-center"
      }
    >
      <img
        alt=""
        className="max-h-full max-w-full object-contain"
        src={imgGroup}
      />
    </div>
  );
}

function LetsIconsOrderFill({ className }) {
  return (
    <div
      className={
        className || "relative size-[40px] flex items-center justify-center"
      }
    >
      <img
        alt=""
        className="max-h-full max-w-full object-contain"
        src={imgVector1}
      />
    </div>
  );
}

function MaterialSymbolsEdit({ className }) {
  return (
    <div
      className={
        className || "relative size-[40px] flex items-center justify-center"
      }
    >
      <img
        alt=""
        className="max-h-full max-w-full object-contain"
        src={imgVector4}
      />
    </div>
  );
}

function MaterialSymbolsLightDashboardRounded({ className }) {
  return (
    <div
      className={
        className || "relative size-[40px] flex items-center justify-center"
      }
    >
      <img
        alt=""
        className="max-h-full max-w-full object-contain"
        src={imgVector5}
      />
    </div>
  );
}

function EntypoLogOut({ className }) {
  return (
    <div
      className={
        className || "relative size-[30px] flex items-center justify-center"
      }
    >
      <img
        alt=""
        className="max-h-full max-w-full object-contain"
        src={imgVector2}
      />
    </div>
  );
}

const Sidebar = () => {
  const navigate = useNavigate();
  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: MaterialSymbolsLightDashboardRounded,
    },
    { name: "Manajemen Menu", path: "/admin/menu", icon: MaterialSymbolsEdit },
    { name: "Pesanan", path: "/admin/orders", icon: LetsIconsOrderFill },
    { name: "Status Pesanan", path: "/admin/status", icon: MingcuteTimeFill },
    {
      name: "Rating & Review",
      path: "/admin/reviews",
      icon: MaterialSymbolsStarRounded,
    },
  ];

  const { user, logout } = useAuth();

  return (
    <div className="w-[434px] bg-gradient-to-b from-[#770001] to-[#d90102] h-screen fixed left-0 top-0 border-r border-black overflow-y-auto">
      <div className="px-[35px] py-[26px]">
        <h1 className="font-paytone text-[28px] text-white leading-tight w-[288px]">
          JOS JIS - Dashboard Admin
        </h1>
      </div>

      <nav className="mt-[50px] px-[35px] space-y-[9px]">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-[28px] h-[93px] px-[30px] rounded-[10px] transition-all relative ${
                isActive
                  ? "border-3 border-black bg-[rgba(217,217,217,0.5)] shadow-[0px_0px_42px_0px_rgba(0,0,0,0.58)]"
                  : "bg-[rgba(217,217,217,0.5)] shadow-[0px_0px_42px_0px_rgba(0,0,0,0.58)]"
              }`
            }
          >
            <item.icon className="size-[40px] shrink-0" />
            <span className="font-roboto font-medium text-[25px] text-white">
              {item.name}
            </span>
          </NavLink>
        ))}
      </nav>

      <div className="absolute bottom-[66px] left-[35px]">
        <button
          onClick={logout}
          className="flex items-center gap-[8px] h-[66px] bg-[rgba(0,0,0,0.55)] border border-black rounded-[10px] pb-[10px] pl-[20px] pr-[21px] pt-[9px] hover:bg-black/70 transition-colors"
        >
          <EntypoLogOut className="size-[30px] shrink-0" />
          <span className="font-paytone text-[24px] text-white">Keluar</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
