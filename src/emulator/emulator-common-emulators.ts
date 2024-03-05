export type EmulatorType =
    | "BasiliskII"
    | "SheepShaver"
    | "Mini vMac"
    | "DingusPPC"
    | "Previous";

export type EmulatorSubtype =
    // Mini vMac
    | "128K"
    | "512Ke"
    | "Plus"
    | "SE"
    | "II"
    // Previous
    | "NeXT Computer"
    | "NeXTcube"
    | "NeXTstation"
    | "NeXTstation Turbo Color";

export type EmulatorCpu =
    | "68000"
    | "68020"
    | "68030"
    | "68040"
    | "601"
    | "603"
    | "604"
    | "G3";

export const EMULATOR_REMOVABLE_DISK_COUNT = 7;

export function emulatorUsesPlaceholderDisks(type: EmulatorType): boolean {
    return type === "BasiliskII" || type === "SheepShaver";
}

export function emulatorSupportsSpeedSetting(type: EmulatorType): boolean {
    return type === "Mini vMac";
}

// True if the emulator can optionally use mouse deltas instead of absolute
// coordinates (separate from emulatorNeedsMouseDeltas, those emulators always
// use deltas).
export function emulatorSupportsMouseDeltas(type: EmulatorType): boolean {
    return type === "BasiliskII" || type === "SheepShaver";
}

export function emulatorNeedsMouseDeltas(type: EmulatorType): boolean {
    return type === "DingusPPC" || type === "Previous";
}

export function emulatorSupportsAppleTalk(type: EmulatorType): boolean {
    return type === "BasiliskII" || type === "SheepShaver";
}

export function emulatorSupportsDownloadsFolder(type: EmulatorType): boolean {
    return type === "BasiliskII" || type === "SheepShaver";
}

export function emulatorNeedsDeviceImage(type: EmulatorType): boolean {
    return type === "DingusPPC";
}

export function emulatorCpuId(
    type: EmulatorType,
    cpu: EmulatorCpu
): number | undefined {
    if (type !== "BasiliskII") {
        return undefined;
    }
    switch (cpu) {
        case "68020":
            return 2;
        case "68030":
            return 3;
        case "68040":
            return 4;
        default:
            return undefined;
    }
}

export function emulatorModelId(
    type: EmulatorType,
    gestaltID: number
): number | undefined {
    if (type !== "BasiliskII") {
        return undefined;
    }
    return gestaltID - 6;
}

// -2 is a special value meaning the default that Mini vMac was built with,
// other values are what it uses in CONTROLM.h for speeds.
export type EmulatorSpeed = -2 | 0 | 1 | 2 | 3 | 4 | 5 | -1;

export const EMULATOR_SPEEDS = new Map<EmulatorSpeed, string>([
    [-2, "Default"],
    [0, "1x"],
    [1, "2x"],
    [2, "4x"],
    [3, "8x"],
    [4, "16x"],
    [5, "32x"],
    [-1, "All Out"],
]);

export type EmulatorDef = {
    emulatorType: EmulatorType;
    emulatorSubtype?: EmulatorSubtype;
};
